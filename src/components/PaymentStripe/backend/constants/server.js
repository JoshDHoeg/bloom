//BLOOMTIME DESIGN 2019

const path = require('path'); //get the path

const SERVER_PORT = 80; //set the server port

const SERVER_CONFIGS = { //configure the server
  PRODUCTION: process.env.NODE_ENV === 'production',
  PORT: process.env.NODE_ENV || SERVER_PORT,
};

module.exports = SERVER_CONFIGS;