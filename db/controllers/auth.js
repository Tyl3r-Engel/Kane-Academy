const { pool } = require('../pool');

const signup = (issuer, profile, cb) => {
  const queryString = `INSERT INTO users
  (mentor, first_name, last_name, email, gid)
  VALUES (false, $1, $2, $3, $4)`
  pool.query(queryString, [
    profile.name.givenName, profile.name.familyName, profile.emails[0].value, profile.id,
  ], () => {
    pool.query(`SELECT id, mentor FROM users WHERE gid = $1 AND email = $2;`, [
      profile.id, profile.emails[0].value,
    ], (err, results) => {
      if (err) {
        console.log('error, user in db with same email already');
        cb(err);
      } else {
        cb(null, results.rows[0]);
      }
    });
  });
};

const verifySession = (sessionId, cb) => {
  const queryString = `SELECT * FROM sessions WHERE sid = $1`;
  pool.query(queryString, [sessionId], cb);
}

module.exports = {
  signup,
  verifySession,
};
