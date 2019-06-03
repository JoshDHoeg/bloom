//BLOOMTIME DESIGN 2019
// const cookieParser = require('cookie-parser');
const cors = require('cors'); //use cors
const bodyParser = require('body-parser'); //use body-parser (must also use this dependency)
// const express = require('express');
// const path = require('path');

const CORS_WHITELIST = require('./constants/frontend'); //use cors whitelist to avoid cors header authorization error (must also use this dependency)

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
  app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow_Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTION, POST, PUT");

    next()
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false}))
  // if(process.env.NODE_ENV === 'production'){
  //   app.use(express.static('client/build'));
  // }
};

module.exports = configureServer;