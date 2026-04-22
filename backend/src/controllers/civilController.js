const pool = require('../db');

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
  const {
    user_id, parent_civil_id,
    last_name, first_name, gender, date_of_birth,
    register_num, registered_num, phone, email,
    addr_territories_id, addr_aimag_city_code, addr_soum_district_code,
    addr_bag_khorro_code, addr_region_id, addr_street_id,
    addr_apartment_id, addr_town_id, addr_detail,
    edu_level_code, profession, org_code, emp_position_code,
    is_leaf, leader_code, created_by
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO fact_civil (
         user_id, parent_civil_id,
         last_name, first_name, gender, date_of_birth,
         register_num, registered_num, phone, email,
         addr_territories_id, addr_aimag_city_code, addr_soum_district_code,
         addr_bag_khorro_code, addr_region_id, addr_street_id,
         addr_apartment_id, addr_town_id, addr_detail,
         edu_level_code, profession, org_code, emp_position_code,
         is_leaf, leader_code,
         effective_start_date, effective_last_change, created_by
       ) VALUES (
         $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
         $11,$12,$13,$14,$15,$16,$17,$18,$19,
         $20,$21,$22,$23,$24,$25,
         CURRENT_DATE,'Y',$26
       ) RETURNING *`,
      [
        user_id, parent_civil_id,
        last_name, first_name, gender, date_of_birth,
        register_num, registered_num, phone, email,
        addr_territories_id, addr_aimag_city_code, addr_soum_district_code,
        addr_bag_khorro_code, addr_region_id, addr_street_id,
        addr_apartment_id, addr_town_id, addr_detail,
        edu_level_code, profession, org_code, emp_position_code,
        is_leaf || 'Y', leader_code, created_by || req.user.username
      ]
    );
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

    // Хуучин record-ийг хаах
    await client.query(
      `UPDATE fact_civil
       SET effective_end_date = CURRENT_DATE, effective_last_change = 'N',
           updated_date = NOW(), updated_by = $1
       WHERE civil_id = $2 AND effective_last_change = 'Y'`,
      [by, id]
    );

    // Хуучин record-ийг унших
    const old = await client.query(
      'SELECT * FROM fact_civil WHERE civil_id = $1', [id]
    );
    if (old.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Бүртгэл олдсонгүй' });
    }
    const prev = old.rows[0];

    // Шинэ record үүсгэх
    const merged = { ...prev, ...fields };
    const result = await client.query(
      `INSERT INTO fact_civil (
         user_id, parent_civil_id,
         last_name, first_name, gender, date_of_birth,
         register_num, registered_num, phone, email,
         addr_territories_id, addr_aimag_city_code, addr_soum_district_code,
         addr_bag_khorro_code, addr_region_id, addr_street_id,
         addr_apartment_id, addr_town_id, addr_detail,
         edu_level_code, profession, org_code, emp_position_code,
         is_leaf, leader_code,
         effective_start_date, effective_last_change, created_by, status
       ) VALUES (
         $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
         $11,$12,$13,$14,$15,$16,$17,$18,$19,
         $20,$21,$22,$23,$24,$25,
         CURRENT_DATE,'Y',$26,$27
       ) RETURNING *`,
      [
        merged.user_id, merged.parent_civil_id,
        merged.last_name, merged.first_name, merged.gender, merged.date_of_birth,
        merged.register_num, merged.registered_num, merged.phone, merged.email,
        merged.addr_territories_id, merged.addr_aimag_city_code, merged.addr_soum_district_code,
        merged.addr_bag_khorro_code, merged.addr_region_id, merged.addr_street_id,
        merged.addr_apartment_id, merged.addr_town_id, merged.addr_detail,
        merged.edu_level_code, merged.profession, merged.org_code, merged.emp_position_code,
        merged.is_leaf, merged.leader_code, by, merged.status
      ]
    );

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
         AND (last_name ILIKE $1 OR first_name ILIKE $1
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
