//BLOOMTIME DESIGN 2019
// const cookieParser = require('cookie-parser');
const cors = require('cors'); //use cors
const bodyParser = require('body-parser'); //use body-parser (must also use this dependency)
const express = require('express');
const path = require('path');

const CORS_WHITELIST = require('./constants/frontend'); //use cors whitelist to avoid cors header authorization error (must also use this dependency)

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'example.com');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('X-Requested-With: XMLHttpRequest')

  next();
}

const corsOptions = {
  origin: (origin, callback) =>
    (CORS_WHITELIST.indexOf(origin) !== -1)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'))
};

const configureServer = app => { //configure the express server
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
  }
  app.use(allowCrossDomain)
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use('/charge', express.json())
};

module.exports = configureServer;