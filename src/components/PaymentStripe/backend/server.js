//BLOOMTIME DESIGN 2019

const cors = require('cors'); //use cors
const bodyParser = require('body-parser'); //use body-parser (must also use this dependency)

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
  app.use(bodyParser.json());
  if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
  }
};

module.exports = configureServer;