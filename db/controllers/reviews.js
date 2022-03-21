const { pool } = require('../pool');

const reviews = (mentor_id, learner_id, skill_id, rating, body, time, cb) => {
  const queryString = `INSERT INTO reviews (mentor_id, learner_id, skill_id, rating, body, time)
  VALUES ($1, $2, $3, $4, $5, $6)`;

  pool.query(queryString, [mentor_id, learner_id, skill_id, rating, body, time], cb);
}

module.exports = {
  reviews,
};
