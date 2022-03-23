const { pool } = require('../pool');

const addMentorCalendar = (dataPack, cb) => {
  const queryString = `UPDATE mentor_profiles SET calendly = $1 WHERE mentor_id = $2`;

  pool.query(queryString, [dataPack.calendly, dataPack.mentId], cb);
}

const getMentorCalendar = (dataPack, cb) => {
  const queryString = `SELECT calendly FROM mentor_profiles WHERE mentor_id = $1`;

  pool.query(queryString, [dataPack.mentId], cb);
}

module.exports = {
  addMentorCalendar, getMentorCalendar,
};
