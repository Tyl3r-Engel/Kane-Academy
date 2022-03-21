const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const pgSession = require('connect-pg-simple')(session);
const { pool } = require('../db/pool');
const auth = require('./auth');

require('dotenv').config();

const app = express();
app.use(cookieParser('David Snakehoff'));
app.use(logger('tiny'));
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

app.get('/*/bundle.js', (req, res) => {
  res.sendFile('bundle.js', { root: path.join(__dirname, '../public/dist') });
});

// NOTE TO TEAM: PLACE ALL QUERIES THAT REQUIRE LOGIN BELOW THIS AUTHORIZATION
app.use(auth);

app.get('/profile', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/dist') });
});

const port = process.env.PORT || 6969;
app.listen(port);
