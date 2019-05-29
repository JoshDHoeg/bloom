//BLOOMTIME DESIGN 2019

const cors = require('cors'); //use cors
const bodyParser = require('body-parser'); //use body-parser (must also use this dependency)
const express = require('express');
const path = require('path');

const CORS_WHITELIST = require('./constants/frontend'); //use cors whitelist to avoid cors header authorization error (must also use this dependency)
var forceSsl = function (req, res, next) {
  if(req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
}
const corsOptions = {
  origin: (origin, callback) =>
    (CORS_WHITELIST.indexOf(origin) !== -1)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'))
};

const configureServer = app => { //configure the express server
  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(forceSsl);
  if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, "/public")));
  }
  // if(process.env.NODE_ENV === 'production'){
  //   app.use(express.static('client/build'));
  // }
};

module.exports = configureServer;