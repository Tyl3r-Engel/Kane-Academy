const { verifySession } = require('../db/controllers/auth');

const auth = (req, res, next) => {
  if (req.session.passport) {
    console.log('Verified and authorized: ', req.session.passport.user);
    next();
  } else {
    console.log('Not logged in');
    res.redirect('/login');
  }
}

module.exports = auth;