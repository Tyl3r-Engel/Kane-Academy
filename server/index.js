const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const pgSession = require('connect-pg-simple')(session);
const { pool } = require('../db/pool');
const auth = require('./auth');
const bodyParser = require('body-parser');

require('dotenv').config();
const { generateData } = require('../db/fakeData.js')
const { addMentorProfile, getMentorProfile } = require('../db/controllers/mentorProfiles.js')
const { addReview, getReviews } = require('../db/controllers/reviews.js')
const { getSkills } = require('../db/controllers/skills.js')
const { getSession } = require('../db/controllers/sessions.js')

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

app.get('/fakedata', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/dist') });
  generateData((result) => {
    res.send(result)
  })
});

// NOTE TO TEAM: PLACE ALL QUERIES THAT REQUIRE LOGIN BELOW THIS AUTHORIZATION
// app.use(auth);

app.get('/profile*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/dist') });
});

// app.get('/profile/*', (req, res) => {
//   res.sendFile('index.html', { root: path.join(__dirname, '../public/dist') });
// });

app.get('/api/getSess', (req, res) => {
  getSession((err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result.rows)
    }
  })
})

app.get('/api/getProfile/*', (req, res) => {
  getMentorProfile(req.params[0], (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result.rows)
    }
  })
})

app.get('/api/getReviews/*', (req, res) => {
  getReviews(req.params[0], (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result.rows)
    }
  })
})

app.get('/api/getSkills', (req, res) => {
  getSkills((err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result.rows)
    }
  })
})

const port = process.env.PORT || 3001;
app.listen(port);
