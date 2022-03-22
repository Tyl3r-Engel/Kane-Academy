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
const { generateData } = require('../db/fakeData.js')
const { v4: uuidV4 } = require('uuid')

const app = express();
app.use(cookieParser('David Snakehoff'));
app.use(logger('tiny'));
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
app.use(auth);

app.get('/profile', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/dist') });
});

// * socket io stuff & video call endpoints
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.set('views', path.join(__dirname, '/videoCall/views'));
app.set('view engine', 'ejs')

app.get('/videoCall', (req, res) => {
  res.redirect(`/videoCall/${uuidV4()}`)
})

app.get('/videoCall/:room', (req, res) => {
  res.render('room', { roomId : req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.broadcast.to(roomId).emit('user-connected', userId);
    socket.on('disconnect', () => {
      socket.broadcast.to(roomId).emit('user-disconnected', userId);
    })
  })
})

const port = process.env.PORT || 3001;
server.listen(port);
