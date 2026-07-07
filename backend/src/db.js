const { Pool, types } = require('pg');

// DATE (OID 1082)-ийг цагийн бүсгүйгээр цэвэр 'YYYY-MM-DD' мөрөөр буцаах
// (эс бөгөөс JS Date болон UTC-д хөрвүүлэхэд нэг өдрөөр шилждэг)
types.setTypeParser(1082, (val) => val);

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'arav',
  user: process.env.DB_USER || 'arav_user',
  password: process.env.DB_PASSWORD || 'arav_pass',
});

module.exports = pool;
