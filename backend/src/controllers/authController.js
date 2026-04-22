const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Нэвтрэх нэр, нууц үг шаардлагатай' });

  try {
    const result = await pool.query(
      `SELECT u.user_id, u.username, u.password_hash,
              array_agg(r.role_code) AS roles
       FROM sec_user u
       LEFT JOIN sec_user_role ur ON ur.user_id = u.user_id
         AND ur.status = 'A' AND ur.effective_last_change = 'Y'
       LEFT JOIN sec_role r ON r.role_id = ur.role_id
         AND r.status = 'A' AND r.effective_last_change = 'Y'
       WHERE u.username = $1
         AND u.status = 'A'
         AND u.effective_last_change = 'Y'
       GROUP BY u.user_id`,
      [username]
    );

    if (result.rows.length === 0)
      return res.status(401).json({ message: 'Нэвтрэх нэр эсвэл нууц үг буруу' });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return res.status(401).json({ message: 'Нэвтрэх нэр эсвэл нууц үг буруу' });

    const token = jwt.sign(
      { user_id: user.user_id, username: user.username, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, user_id: user.user_id, username: user.username, roles: user.roles });
  } catch (err) {
    res.status(500).json({ message: 'Серверийн алдаа', error: err.message });
  }
};

const register = async (req, res) => {
  const { username, password, created_by } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Нэвтрэх нэр, нууц үг шаардлагатай' });

  try {
    const password_hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO sec_user
         (username, password_hash, effective_start_date, effective_last_change, created_by)
       VALUES ($1, $2, CURRENT_DATE, 'Y', $3)
       RETURNING user_id, username`,
      [username, password_hash, created_by || 'system']
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505')
      return res.status(409).json({ message: 'Нэвтрэх нэр давхардаж байна' });
    res.status(500).json({ message: 'Серверийн алдаа', error: err.message });
  }
};

module.exports = { login, register };
