//BLOOMTIME DESIGN 2019

const paymentApi = require('./payment'); //route for payment.js

const configureRoutes = app => {
  paymentApi(app);
};

module.exports = configureRoutes;