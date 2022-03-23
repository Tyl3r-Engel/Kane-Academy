const { pool } = require('../pool');

const addMentorCalendar = (dataPack, cb) => {
  const queryString = `UPDATE mentor_profiles SET calendly = $1 WHERE mentor_id = $2`;
  console.log(dataPack);
  pool.query(queryString, [dataPack.calendly, dataPack.mentId], cb);
}

const getMentorCalendar = (id, cb) => {
  const queryString = `SELECT calendly FROM mentor_profiles WHERE mentor_id = $1`;

  pool.query(queryString, [id], cb);
}

module.exports = {
  addMentorCalendar, getMentorCalendar,
};
