const { Pool } = require('pg');

// Modify this file, and rename it to pool.js

const pool = new Pool({
  user: 'USERNAME_HERE', // probably postgres
  host: 'localhost',
  database: 'DATABASE HERE',  // probably postgres
  password: 'PASSWORD HERE',
  port: '5432',
});

module.exports = { pool };
