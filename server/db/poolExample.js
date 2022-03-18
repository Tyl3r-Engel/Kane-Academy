const { Pool } = require('pg');

const pool = new Pool({
  user: 'USERNAME_HERE', // probably postgres
  host: 'localhost',
  database: 'DATABASE HERE',  // probably postgres
  password: 'PASSWORD HERE',
  port: '5432',
});

module.exports = { pool };
