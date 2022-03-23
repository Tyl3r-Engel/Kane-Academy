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
const { generateData } = require('../db/fakeData.js');
const {
  addMentorProfile,
  getMentorProfile,
} = require('../db/controllers/mentorProfiles.js');
const { addReview, getReviews } = require('../db/controllers/reviews.js');
const { getSkills } = require('../db/controllers/skills.js');
const { getSession } = require('../db/controllers/sessions.js');
const { v4: uuidV4 } = require('uuid');

const app = express();
// app.use(cookieParser('David Snakehoff'));
app.use(logger('tiny'));
app.use(express.json());
const loginRouter = require('./routes/googleLogin');

app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(express.json());

app.use(
  session({
    store: new pgSession({
      pool, // Connection pool
      tableName: 'sessions', // Use another table-name than the default "session" one
    }),
    secret: 'David Snakehoff',
    name: 'sessionId',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
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
    res.send(result);
  });
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
  signup(
    req.body.mentor,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password,
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
    }
  );
});

app.put('/logout', (req, res) => {
  res.clearCookie('sessionId');
  req.session.destroy(() => {
    res.send('/');
  });
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
      res.send(err);
    } else {
      res.send(result.rows);
    }
  });
});

app.get('/api/getProfile/*', (req, res) => {
  getMentorProfile(req.params[0], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.rows);
    }
  });
});

app.get('/api/getReviews/*', (req, res) => {
  getReviews(req.params[0], (err, result) => {
    if (err) {
      console.log('err');
      res.send(null);
    } else {
      console.log('success');
      res.send(result.rows);
    }
  });
});

app.get('/api/getSkills', (req, res) => {
  getSkills((err, result) => {
    if (err) {
      res.send('err');
    } else {
      res.send(result.rows);
    }
  });
});

// * socket io stuff & video call endpoints
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
app.set('views', path.join(__dirname, '/videoCall/views'));
app.set('view engine', 'ejs');

app.get('/videoCall', (req, res) => {
  res.redirect(`/videoCall/${uuidV4()}`);
});

app.get('/videoCall/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-connected', userId);
    socket.on('disconnect', () => {
      socket.broadcast.to(roomId).emit('user-disconnected', userId);
    });
  });
});
///////////////////////////////////////

const chat = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
  },
});

chat.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);
  const users = [];
  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.join('123123');
  socket.emit('users', users);
  console.log(`User with ID: ${socket.id} joined room`);

  socket.on('send', (data) => {
    socket.to('123123').emit('receive', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

const port = process.env.PORT || 3001;
server.listen(port);
