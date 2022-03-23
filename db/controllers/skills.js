const { pool } = require('../pool');

const addSkills = (name, category, description, cb) => {
  const queryString = `INSERT INTO skills (name, category, description)
  VALUES ($1, $2, $3) RETURNING id`;

  pool.query(queryString, [name, category, description], cb);
}

const getSkills = (cb) => {
  const queryString = `SELECT * FROM skills`

  pool.query(queryString, cb)
}

module.exports = {
  addSkills, getSkills
};
