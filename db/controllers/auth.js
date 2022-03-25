const { pool } = require('../pool');
const { addMentorProfile } = require('./mentorProfiles');
const { initMentorSkills } = require('./mentorSkills');

const googleSignup = (issuer, profile, cb) => {
  const queryString = `INSERT INTO users
  (first_name, last_name, email, gid)
  VALUES ($1, $2, $3, $4)`
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
        if (results.rows[0] !== undefined) {
          addMentorProfile(results.rows[0].id, '', '', '', () => {
            initMentorSkills(results.rows[0].id, 1, () => {
              cb(null, results.rows[0]);
            })
          })
        } else {
          cb(null, results.rows[0]);
        }
      }
    });
  });
};

const completeSignup = (mentor, id, cb) => {
  // console.log('inserts:', mentor, id);
  const queryString = `UPDATE users
  SET mentor = $1
  WHERE id = $2`
  pool.query(queryString, [mentor, id], cb);
}

const login = (email, password, cb) => {
  const queryString = `SELECT * FROM users
  WHERE email = $1 AND hash = crypt($2, hash)`;
  //  AND hash = crypt($2, gen_salt('bf'))
  pool.query(queryString, [email, password], cb);
};

module.exports = {
  googleSignup,
  login,
  completeSignup
};
