const { pool } = require('../pool');

const mentorCalendars = (id) => {
  const queryString = `SELECT * FROM users WHERE id = $1`;

  pool.query(queryString, [id], cb);
}

module.exports = {
  mentorCalendars,
};
