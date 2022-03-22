const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
// const cookieParser = require('cookie-parser');
const pgSession = require('connect-pg-simple')(session);
const { pool } = require('../db/pool');
const auth = require('./auth');

require('dotenv').config();
const { generateData } = require('../db/fakeData.js');
const { login } = require('../db/controllers/auth');
const { signup } = require('../db/controllers/signup');

const app = express();
// app.use(cookieParser('David Snakehoff'));
app.use(logger('tiny'));
app.use(express.json());
const loginRouter = require('./routes/googleLogin');

app.use(express.static(path.join(__dirname, '../public/dist')));

app.use(session({
  store: new pgSession({
    pool,                       // Connection pool
    tableName : 'sessions'      // Use another table-name than the default "session" one
  }),
  secret: 'David Snakehoff',
  name: 'sessionId',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

app.use('/', loginRouter);

app.get('/login', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/dist') });
});

app.get('/signup', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/dist') });
});

app.get('/*/bundle.js', (req, res) => {
  res.sendFile('bundle.js', { root: path.join(__dirname, '../public/dist') });
});

app.get('/fakedata', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/dist') });
  generateData((result) => {
    res.send(result)
  })
});

app.post('/login', (req, res) => {
  login(req.body.email, req.body.password, (err, results) => {
    if (err) {
      res.status(400).send();
    } else if (results.rows.length !== 0) {
      req.session.passport = {};
      req.session.passport.user = {
        id: results.rows[0].id,
        mentor: results.rows[0].mentor,
      };
      res.redirect('../profile');
    } else {
      res.status(401).send('Login Failed');
    }
  });
});

app.post('/signup', (req, res) => {
  signup(req.body.mentor, req.body.firstName, req.body.lastName, req.body.email, req.body.password,
    (err, results) => {
      if (err) {
        res.status(401).send('Error: email already in use');
      } else {
        req.session.passport = {};
        req.session.passport.user = {
          id: results.rows[0].id,
          mentor: req.body.mentor,
        };
        res.redirect('../profile');
      }
    });
});

app.put('/logout', (req, res) => {
  res.clearCookie('sessionId');
  req.session.destroy(() => {
    res.send('/');
  })
});

// NOTE TO TEAM: PLACE ALL QUERIES THAT REQUIRE LOGIN BELOW THIS AUTHORIZATION
app.use(auth);

app.get('/profile', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/dist') });
});

const port = process.env.PORT || 3001;
app.listen(port);
