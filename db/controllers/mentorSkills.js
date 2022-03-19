const { pool } = require('../pool');

const mentorSkills = (mentor_id, skill_id, pricing, cb) => {
  const queryString = `INSERT INTO mentor_skills (mentor_id, skill_id, pricing)
  VALUES ($1, $2, $3)`;

  pool.query(queryString, [mentor_id, skill_id, pricing], cb);
}

module.exports = {
  mentorSkills,
};
