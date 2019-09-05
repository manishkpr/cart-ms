require('dotenv').config();

const { Client } = require('pg');
const fs = require('fs');

const sql = fs.readFileSync('seeder.sql').toString();

var client = new Client({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  port: process.env.DATABASE_PORT,
  host: process.env.DATABASE_HOST,
  ssl: process.env.DATABASE_SSL
}); 

client.connect();

client.query(sql, (err) => {
  if (err) {
    console.log('Seeding failed: ', err);
    process.exit(1);
  }

  console.log('Seeding successful.');

  client.end();
  process.exit(0);
});
