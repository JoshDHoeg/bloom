//BLOOMTIME DESIGN 2019

const configureStripe = require('stripe'); 

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production' //Establish back-end API keys
    ? 'sk_live_MY_SECRET_KEY'
    : 'sk_test_TNxcuaz4SYBWQ7dlOrdprwFn00MoU3etcC';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;