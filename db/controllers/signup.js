const { pool } = require('../pool');

const signup = (mentor, firstName, lastName, email, hash, cb) => {
  const queryString = `INSERT INTO users (mentor, firstName, lastName, email, hash)
  VALUES ($1, $2, $3, $4, $5)`;

  pool.query(queryString, [mentor, firstName, lastName, email, hash], cb);
}

module.exports = {
  signup,
};
