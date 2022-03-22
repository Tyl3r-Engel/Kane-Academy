const { pool } = require('../pool');

const sessions = (hash, user_id, cb) => {
  const queryString = `INSERT INTO sessions (hash, user_id)
  VALUES ($1, $2)`;

  pool.query(queryString, [hash, user_id], cb);
}

const getSession = (cb) => {
  const queryString = `SELECT sess from sessions`

  pool.query(queryString, cb)
}

module.exports = {
  sessions, getSession
};
