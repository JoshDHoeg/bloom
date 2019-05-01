//BLOOMTIME DESIGN 2019

const configureStripe = require('stripe'); 

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production' //Establish back-end API keys
    ? 'sk_live_MY_SECRET_KEY'
    : 'sk_test_ftA3WtXowgX1fpECO8HOfE3P00sNI0EwEA';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;