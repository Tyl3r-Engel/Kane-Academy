const { pool } = require('../pool');

const appointments = (mentor_id, learner_id, start_time, end_time, cb) => {
  const queryString = `INSERT INTO appointments (mentor_id, learner_id, start_time, end_time)
  VALUES ($1, $2, $3, $4)`;

  pool.query(queryString, [mentor_id, learner_id, start_time, end_time], cb);
}

module.exports = {
  appointments,
};
