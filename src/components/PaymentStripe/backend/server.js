//BLOOMTIME DESIGN 2019
// const cookieParser = require('cookie-parser');
const cors = require('cors'); //use cors
const bodyParser = require('body-parser'); //use body-parser (must also use this dependency)
const express = require('express');
const path = require('path');

const CORS_WHITELIST = require('./constants/frontend'); //use cors whitelist to avoid cors header authorization error (must also use this dependency)

const corsOptions = {
  origin: (origin, callback) =>
    (CORS_WHITELIST.indexOf(origin) !== -1)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'))
};

const configureServer = app => { //configure the express server
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
};

module.exports = configureServer;