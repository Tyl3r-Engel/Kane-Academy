const express = require('express');
const path = require('path');
const { generateData } = require('../db/fakeData.js');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const pgSession = require('connect-pg-simple')(session);
const { pool } = require('../db/pool');
const auth = require('./auth');

require('dotenv').config();

const { login, completeSignup } = require('../db/controllers/auth');
const { signup } = require('../db/controllers/signup');

const morgan = require('morgan');
const { getFName } = require('../db/controllers/currentUserName');
const {
  addMentorCalendar,
  getMentorCalendar,
} = require('../db/controllers/mentorCalendars');
const {
  addMentorProfile,
  getMentorProfile,
  updateMentorProfile,
  queryMentorProfile,
  searchProfiles,
  updateMentorPhoto
} = require('../db/controllers/mentorProfiles.js');
const {
  addMentorSkills,
  initMentorSkills,
  updateMentorSkills,
  getMentorSkills,
} = require('../db/controllers/mentorSkills.js');

const { addReview, getReviews } = require('../db/controllers/reviews.js');
const { addSkills, getSkills } = require('../db/controllers/skills.js');
const { getSession } = require('../db/controllers/sessions.js');
const { v4: uuidV4 } = require('uuid');

const app = express();
app.use(logger('tiny'));
app.use(express.json());
const loginRouter = require('./routes/googleLogin');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public/dist')));

app.use(
  session({
    store: new pgSession({
      pool, // Connection pool
      tableName: 'sessions', // Use another table-name than the default "session" one
    }),
    secret: 'David Snakehoff',
    name: 'sessionId',
    cookie: { maxAge: 60000000 },
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

app.get('/signup/complete', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/dist') });
});

app.get('/*/bundle.js', (req, res) => {
  res.sendFile('bundle.js', { root: path.join(__dirname, '../public/dist') });
});

app.get('/*/profile.css', (req, res) => {
  res.sendFile('profile.css', {
    root: path.join(__dirname, '../public/dist/css'),
  });
});

app.get('/messages', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/dist') });
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
      res.redirect('../');
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
        addMentorProfile(req.session.passport.user.id, '', '', '', () => {
          initMentorSkills(req.session.passport.user.id, 1, () => {
            res.redirect('../profile');
          });
        });
      }
    }
  );
});

app.post('/signup/complete', (req, res) => {
  completeSignup(
    req.body.mentor,
    req.session.passport.user.id,
    (err, results) => {
      if (err) {
        res.status(401).send('Error: invalid id');
      } else {
        console.log('marked as mentor/learner: ', req.body.mentor);
        req.session.passport.user.mentor = req.body.mentor;
        res.redirect('/');
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
      res.send(null);
    } else {
      res.send(result.rows);
    }
  });
});

app.get('/api/getReviews/*', (req, res) => {
  getReviews(req.params[0], (err, result) => {
    if (err) {
      res.send(null);
    } else {
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

app.put('/api/updateMentorSkills', (req, res) => {
  updateMentorSkills(req.body, (err, result) => {
    if (err) {
      res.send('err');
    } else {
      res.send(result.rows);
    }
  });
});

app.put('/api/addMentorCalendar/*', (req, res) => {
  addMentorCalendar(req.body.id, req.body.calUrl, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.rows);
    }
  });
});

app.get('/api/getMentorCalendar/*', (req, res) => {
  getMentorCalendar(req.params[0], (err, result) => {
    console.log(req.params[0]);
    if (err) {
      console.log('error', err);
      res.send(err);
    } else {
      // console.log('success', result.rows);
      res.send(result.rows[0].calendly);
    }
  });
});

app.get('/api/getProfile/*', (req, res) => {
  getMentorProfile(req.params[0], (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result.rows);
    }
  });
});

app.get('/api/getFirstName/*', (req, res) => {
  getFName(req.params[0], (err, result) => {
    if (err) {
      res.send(null);
    } else {
      // console.log(result.rows[0].first_name);
      res.send(result.rows[0].first_name);
    }
  });
});

app.get('/api/searchProfiles', (req, res) => {
  searchProfiles((err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result.rows);
    }
  });
});

app.get('/api/searchData', (req, res) => {
  getMentorSkills((err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result.rows);
    }
  });
});

app.put('/api/updateMentorProfile', (req, res) => {
  // console.log(req.body);
  updateMentorProfile(req.body.id, req.body.about, (err, result) => {
    if (err) {
      res.send('err');
    } else {
      res.send(result.rows);
    }
  });
});

app.put('/api/updateMentorPhoto', (req, res) => {
  console.log(req.body);
  updateMentorPhoto(req.body.id, req.body.photo, (err, result) => {

    if (err) {
      res.send('err');
    } else {
      res.send(result.rows);
    }

  })

});

app.post('/api/addSkill', (req, res) => {
  addSkills(
    req.body.name,
    req.body.category,
    req.body.description,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.post('/api/addReview', (req, res) => {
  addReview(
    req.body.mentor_id,
    req.body.learner_id,
    req.body.skill_id,
    req.body.rating,
    req.body.body,
    req.body.time,
    (err, result) => {
      if (err) {
        res.send('err');
      } else {
        res.send(result.rows);
      }
    }
  );
});

// * socket io stuff & video call endpoints

const { Server } = require('socket.io');
const cors = require('cors');
const server = require('http').createServer(app);
app.use(cors());
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const videoCall = io.of('videoCall');
videoCall.on('connection', (socket) => {
  socket.on('rendered', () => {
    socket.emit('me', socket.id);
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });
  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    videoCall
      .to(userToCall)
      .emit('callUser', { signal: signalData, from, name });
  });
  socket.on('answerCall', (data) => {
    videoCall.to(data.to).emit('callAccepted', data.signal);
  });
});

///////////////////////////////////////
const chat = io.of('/chat');
chat.on('connection', (socket) => {
  const users = [];
  for (let [id, socket] of chat.sockets) {
    users.push({
      userID: id,
      username: socket.handshake.auth.name,
    });
  }
  socket.join('123123');
  chat.emit('users', users);
  chat.emit(
    'Userconnect',
    `${socket.username} joined room ${socket.adapter.rooms}`
  );
  // console.log(socket);
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
  socket.on('send', (data) => {
    chat.emit('receive', data);
  });

  socket.on('disconnect', () => {
    // console.log(users, 'before');
    for (let i = 0; i < users.length; i++) {
      if (users[i].userID === socket.id) {
        users.splice(i, 1);
      }
    }

    console.log('User Disconnected', socket.id);
    chat.emit('users', users);
  });
  socket.on('t', (data) => {
   // console.log(socket.id);
  });
  socket.on('private message', (data) => {
    console.log(data.to, 'data to');
    chat.to(data.to).emit('private message', {
      data,
      from: socket.id,
    });
    // console.log('privite fired');
  });
});
chat.use((socket, next) => {
  const username = socket.handshake.auth.name;
  if (!username) {
    return next(new Error('invalid username'));
  }
  socket.username = username;
  next();
});

const port = process.env.PORT || 3001;
server.listen(port, () => console.log('listening on port ', port));
