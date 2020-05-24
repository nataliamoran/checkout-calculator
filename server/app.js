const path = require('path');
const express = require('express');

// cors middleware
const cors = require('cors');

const apiRouter = require('./api-router');

const app = express();

app.use(express.json());

app.use(cors());

// serve static files from React app
app.use(express.static(path.join(__dirname, '../build')));

app.use('/api', apiRouter);

// catchall handler => index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

module.exports = app;
