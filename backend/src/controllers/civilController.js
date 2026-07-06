const pool = require('../db');

// fact_civil-д бичигдэх багануудын жагсаалт (audit/effective баганаас бусад)
const CIVIL_COLUMNS = [
  'user_id', 'parent_civil_id',
  'forename', 'last_name', 'first_name', 'gender', 'date_of_birth',
  'register_num', 'registered_num', 'phone', 'email', 'secondary_phone', 'emergency_phone',
  'id_card_num', 'blood_type', 'ethnicity_code', 'nationality_code', 'birth_place_code',
  'marital_status_code', 'photo_url',
  'father_name', 'mother_name', 'spouse_name', 'children_count',
  'addr_territories_id', 'addr_aimag_city_code', 'addr_soum_district_code', 'addr_bag_khorro_code',
  'addr_region_id', 'addr_street_id', 'addr_apartment_id', 'addr_town_id', 'addr_detail',
  'edu_level_code', 'edu_profession_code', 'org_code', 'emp_position_code',
  'social_status_code', 'disability_code', 'military_status_code', 'income_level_code',
  'is_leaf', 'leader_code',
];

const getAll = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, u.username
       FROM fact_civil c
       JOIN sec_user u ON u.user_id = c.user_id
       WHERE c.status = 'A' AND c.effective_last_change = 'Y'
       ORDER BY c.civil_id`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Серверийн алдаа', error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, u.username
       FROM fact_civil c
       JOIN sec_user u ON u.user_id = c.user_id
       WHERE c.civil_id = $1 AND c.status = 'A' AND c.effective_last_change = 'Y'`,
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Бүртгэл олдсонгүй' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Серверийн алдаа', error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const values = CIVIL_COLUMNS.map((c) => {
      if (c === 'is_leaf') return req.body.is_leaf || 'Y';
      return req.body[c] === undefined || req.body[c] === '' ? null : req.body[c];
    });
    const createdBy = req.body.created_by || req.user.username;

    const placeholders = CIVIL_COLUMNS.map((_, i) => `$${i + 1}`).join(', ');
    const createdByIdx = CIVIL_COLUMNS.length + 1;
    const sql = `INSERT INTO fact_civil (
        ${CIVIL_COLUMNS.join(', ')},
        effective_start_date, effective_last_change, created_by
      ) VALUES (
        ${placeholders},
        CURRENT_DATE, 'Y', $${createdByIdx}
      ) RETURNING *`;

    const result = await pool.query(sql, [...values, createdBy]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Серверийн алдаа', error: err.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { updated_by, ...fields } = req.body;
  const by = updated_by || req.user.username;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Хуучин record-ийг унших
    const old = await client.query(
      `SELECT * FROM fact_civil WHERE civil_id = $1 AND effective_last_change = 'Y'`,
      [id]
    );
    if (old.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Бүртгэл олдсонгүй' });
    }
    const prev = old.rows[0];

    // Хуучин record-ийг хаах
    await client.query(
      `UPDATE fact_civil
       SET effective_end_date = CURRENT_DATE, effective_last_change = 'N',
           updated_date = NOW(), updated_by = $1
       WHERE civil_id = $2 AND effective_last_change = 'Y'`,
      [by, id]
    );

    // Шинэ record үүсгэх (хуучин + өөрчлөлт)
    const merged = { ...prev, ...fields };
    const values = CIVIL_COLUMNS.map((c) => merged[c] === undefined || merged[c] === '' ? null : merged[c]);

    const placeholders = CIVIL_COLUMNS.map((_, i) => `$${i + 1}`).join(', ');
    const createdByIdx = CIVIL_COLUMNS.length + 1;
    const statusIdx = CIVIL_COLUMNS.length + 2;
    const sql = `INSERT INTO fact_civil (
        ${CIVIL_COLUMNS.join(', ')},
        effective_start_date, effective_last_change, created_by, status
      ) VALUES (
        ${placeholders},
        CURRENT_DATE, 'Y', $${createdByIdx}, $${statusIdx}
      ) RETURNING *`;

    const result = await client.query(sql, [...values, by, merged.status || 'A']);

    await client.query('COMMIT');
    res.json(result.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ message: 'Серверийн алдаа', error: err.message });
  } finally {
    client.release();
  }
};

const deactivate = async (req, res) => {
  const { id } = req.params;
  const by = req.body.updated_by || req.user.username;
  try {
    await pool.query(
      `UPDATE fact_civil
       SET status = 'I', effective_end_date = CURRENT_DATE,
           effective_last_change = 'N', updated_date = NOW(), updated_by = $1
       WHERE civil_id = $2 AND effective_last_change = 'Y'`,
      [by, id]
    );
    res.json({ message: 'Бүртгэл идэвхгүй болгогдлоо' });
  } catch (err) {
    res.status(500).json({ message: 'Серверийн алдаа', error: err.message });
  }
};

const search = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: 'Хайлтын утга шаардлагатай' });
  try {
    const result = await pool.query(
      `SELECT * FROM fact_civil
       WHERE status = 'A' AND effective_last_change = 'Y'
         AND (last_name ILIKE $1 OR first_name ILIKE $1 OR forename ILIKE $1
              OR register_num ILIKE $1 OR registered_num ILIKE $1
              OR phone ILIKE $1)
       ORDER BY last_name, first_name`,
      [`%${q}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Серверийн алдаа', error: err.message });
  }
};

module.exports = { getAll, getById, create, update, deactivate, search };
