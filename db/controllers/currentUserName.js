const { pool } = require('../pool');

const getFName = (id, cb) => {
  const queryString = `SELECT first_name FROM users WHERE id = $1`;

  pool.query(queryString, [id], cb);
}

module.exports = {
  getFName,
};