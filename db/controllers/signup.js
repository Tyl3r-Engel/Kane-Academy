const { pool } = require('../pool');

const signup = (issuer, profile, cb) => {
  const queryString = `INSERT INTO users (mentor, firstName, lastName, email, hash)
  VALUES ($1, $2, $3, $4, $5)`;
  console.log('issuer: ', issuer);
  console.log(profile);

  pool.query(queryString, [mentor, firstName, lastName, email, hash], cb);
}

module.exports = {
  signup,
};
