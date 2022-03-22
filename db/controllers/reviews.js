const { pool } = require('../pool');

const addReview = (mentor_id, learner_id, skill_id, rating, body, time, cb) => {
  const queryString = `INSERT INTO reviews (mentor_id, learner_id, skill_id, rating, body, time)
  VALUES ($1, $2, $3, $4, $5, $6)`;

  pool.query(queryString, [mentor_id, learner_id, skill_id, rating, body, time], cb);
}

const getReviews = (mentor_id, cb) => {
  const queryString = `SELECT * FROM reviews WHERE mentor_id = $1`

  pool.query(queryString, [mentor_id], cb)
}

module.exports = {
  addReview, getReviews
};
