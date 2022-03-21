const { pool } = require('../pool');

const messages = (sender_id, recipient_id, body, time, cb) => {
  const queryString = `INSERT INTO messages (sender_id, recipient_id, body, time)
  VALUES ($1, $2, $3, $4)`;

  pool.query(queryString, [sender_id, recipient_id, body, time], cb);
}

module.exports = {
  messages,
};
