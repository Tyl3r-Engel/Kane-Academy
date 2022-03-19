const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(express.json());

app.get('/login', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/dist') });
});

app.get('/*/bundle.js', (req, res) => {
  res.sendFile('bundle.js', { root: path.join(__dirname, '../public/dist') });
});

app.get('/profile', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/dist') });
});

const port = process.env.PORT || 3001;
app.listen(port);
