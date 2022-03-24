const { pool } = require('../pool');

const addMentorCalendar = (id, calUrl, cb) => {
  const queryString = `UPDATE mentor_profiles SET calendly = $1 WHERE mentor_id = $2`;

  pool.query(queryString, [calUrl, id], cb);
}

const getMentorCalendar = (id, cb) => {
  const queryString = `SELECT calendly FROM mentor_profiles WHERE mentor_id = $1`;

  pool.query(queryString, [id], cb);
}

module.exports = {
  addMentorCalendar, getMentorCalendar,
};

