const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
// const cookieParser = require('cookie-parser');
const pgSession = require('connect-pg-simple')(session);
const { pool } = require('../db/pool');
const auth = require('./auth');
const bodyParser = require('body-parser');

require('dotenv').config();

const { login } = require('../db/controllers/auth');
const { signup } = require('../db/controllers/signup');
const { generateData } = require('../db/fakeData.js')
const { addMentorProfile, getMentorProfile } = require('../db/controllers/mentorProfiles.js')
const { addReview, getReviews } = require('../db/controllers/reviews.js')
const { getSkills } = require('../db/controllers/skills.js')
const { getSession } = require('../db/controllers/sessions.js')
const { v4: uuidV4 } = require('uuid')


const app = express();
// app.use(cookieParser('David Snakehoff'));
app.use(logger('tiny'));
app.use(express.json());
const loginRouter = require('./routes/googleLogin');

app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(express.json());

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
      console.log('err')
      res.send(null)
    } else {
      console.log('success')
      res.send(result.rows)
    }
  })
})

app.get('/api/getSkills', (req, res) => {
  getSkills((err, result) => {
    if (err) {
      res.send('err')
    } else {
      res.send(result.rows)
    }
  })
})

    // * socket io stuff & video call endpoints
const server = require('http').createServer(app);
const cors = require('cors')
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})
app.use(cors())

io.on('connection', socket => {
  socket.emit('me', socket.id)
  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded')
  })
  socket.on('callUser', ({ userToCall, signalData, from, name}) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name })
  })
  socket.on('answerCall', data => {
    io.to(data.to).emit('callAccepted', data.signal)
  })
})

const port = process.env.PORT || 3001;
server.listen(port);
