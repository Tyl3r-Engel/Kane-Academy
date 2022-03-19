const { pool } = require('../pool');

const mentorProfile = (mentor_id, about, cb) => {
  const queryString = `INSERT INTO mentor_profiles (mentor_id, about)
  VALUES ($1, $2)`;

  pool.query(queryString, [mentor_id, about], cb);
}

module.exports = {
  mentorProfile,
};
