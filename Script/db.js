const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'MeAdota',
  password: 'MABD',
  port: 5432,
});

module.exports = client;
