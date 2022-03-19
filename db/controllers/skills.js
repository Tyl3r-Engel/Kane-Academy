const { pool } = require('../pool');

const skills = (name, category, description, cb) => {
  const queryString = `INSERT INTO skills (name, category, description)
  VALUES ($1, $2, $3)`;

  pool.query(queryString, [name, category, description], cb);
}

module.exports = {
  skills,
};
