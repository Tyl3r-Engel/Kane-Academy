const { pool } = require('../pool');

const signup = (mentor, firstName, lastName, email, hash, cb) => {
  console.log(email, hash);
  const queryString = `INSERT INTO users (mentor, first_name, last_name, email, hash)
  VALUES ($1, $2, $3, $4, crypt($5, gen_salt('bf'))) returning id`;

  pool.query(queryString, [mentor, firstName, lastName, email, hash], cb);
}

module.exports = {
  signup,
};
