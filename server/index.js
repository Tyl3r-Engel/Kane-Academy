const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { generateData } = require('../db/fakeData.js')

const app = express();

app.use(morgan('dev'));
app.use(express.json());
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

// app.get('/skills', (req, res) => {

//   console.log(skills);
//   skills
//     .query('SELECT * FROM skills')
//     .catch(err => console.log(err.stack))
//     .then(results => res.json(results.rows))
// })

const port = process.env.PORT || 3001;
app.listen(port);
