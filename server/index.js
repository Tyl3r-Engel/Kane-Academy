const express = require('express');
const path = require('path');
const { generateData } = require('../db/fakeData.js')
const { v4: uuidV4 } = require('uuid')

const app = express();

app.use(express.static(path.join(__dirname, '../public/dist')));

app.get('/login', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/dist') });
});

app.get('/*/bundle.js', (req, res) => {
  res.sendFile('bundle.js', { root: path.join(__dirname, '../public/dist') });
});

app.get('/profile', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/dist') });
});

app.get('/fakedata', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/dist') });
  generateData((result) => {
    res.send(result)
  })
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
