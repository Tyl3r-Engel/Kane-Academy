const auth = (req, res, next) => {
  if (req.session.passport) {
    if (req.session.passport.user.mentor === null) {
      console.log('Signup Incomplete: ', req.session.passport);
      res.redirect('/signup/complete');
    } else {
      console.log('Verified and authorized: ', req.session.passport.user);
      next();
    }
  } else {
    console.log('Not logged in, trying to get: ', req.url, req.session.passport);
    res.redirect('/login');
  }
}

module.exports = auth;