require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'arav',
  user: process.env.DB_USER || 'arav_user',
  password: process.env.DB_PASSWORD || 'arav_pass',
});

async function migrate() {
  await client.connect();
  console.log('DB-тэй холбогдлоо.');

  const migrationsDir = path.join(__dirname, '..', 'database', 'migrations');
  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    if (!file.endsWith('.sql')) continue;
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    console.log(`Ажиллуулж байна: ${file}`);
    await client.query(sql);
    console.log(`Дууслаа: ${file}`);
  }

  await client.end();
  console.log('Migration амжилттай дууслаа.');
}

migrate().catch((err) => {
  console.error('Migration алдаа:', err.message);
  process.exit(1);
});
