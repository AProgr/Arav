const pool = require('../db');

// Зөвшөөрөгдсөн lu_ хүснэгтүүд (SQL injection-оос хамгаалах whitelist)
// key → { table, code багана, name багана }
const LU = {
  ethnicity:       { table: 'lu_ethnicity',       code: 'ethnicity_code',       name: 'ethnicity_name' },
  nationality:     { table: 'lu_nationality',      code: 'nationality_code',     name: 'nationality_name' },
  birth_place:     { table: 'lu_birth_place',      code: 'birth_place_code',     name: 'birth_place_name' },
  marital_status:  { table: 'lu_marital_status',   code: 'marital_status_code',  name: 'marital_status_name' },
  aimag_city:      { table: 'lu_aimag_city',       code: 'aimag_city_code',      name: 'aimag_city_name' },
  soum_district:   { table: 'lu_soum_district',    code: 'soum_district_code',   name: 'soum_district_name' },
  bag_khoroo:      { table: 'lu_bag_khoroo',       code: 'bag_khoroo_code',      name: 'bag_khoroo_name' },
  edu_level:       { table: 'lu_edu_level',        code: 'edu_level_code',       name: 'edu_level_name' },
  edu_profession:  { table: 'lu_edu_profession',   code: 'edu_profession_code',  name: 'edu_profession_name' },
  org:             { table: 'lu_org',              code: 'org_code',             name: 'org_name' },
  emp_position:    { table: 'lu_emp_position',     code: 'emp_position_code',    name: 'emp_position_name' },
  social_status:   { table: 'lu_social_status',    code: 'social_status_code',   name: 'social_status_name' },
  disability:      { table: 'lu_disability',       code: 'disability_code',      name: 'disability_name' },
  military_status: { table: 'lu_military_status',  code: 'military_status_code',  name: 'military_status_name' },
  income_level:    { table: 'lu_income_level',     code: 'income_level_code',    name: 'income_level_name' },
  leader_type:     { table: 'lu_leader_type',      code: 'leader_type_code',     name: 'leader_type_name' },
};

// GET /api/lookup            → боломжтой лавлахуудын нэрс
const list = (_req, res) => {
  res.json(Object.keys(LU));
};

// GET /api/lookup/:name           → [{ code, name, parent_code }]
// GET /api/lookup/:name?parent=XX → parent_code-оор шүүсэн (шаталсан: сум←аймаг, хороо←сум)
const getByName = async (req, res) => {
  const meta = LU[req.params.name];
  if (!meta) return res.status(404).json({ message: 'Лавлах олдсонгүй' });

  const { parent } = req.query;
  const params = [];
  let where = "status = 'A'";
  if (parent !== undefined) {
    params.push(parent);
    where += ` AND parent_code = $${params.length}`;
  }

  try {
    const result = await pool.query(
      `SELECT ${meta.code} AS code, ${meta.name} AS name, parent_code
         FROM ${meta.table}
        WHERE ${where}
        ORDER BY sort_order, ${meta.name}`,
      params
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Серверийн алдаа', error: err.message });
  }
};

module.exports = { list, getByName };
