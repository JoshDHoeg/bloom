//BLOOMTIME DESIGN 2019
import axios from 'axios'; //Add this dependency
import React from 'react';

import StripeCheckout from 'react-stripe-checkout'; //Add this dependency

//API KEYS
import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'USD'; //Set currency

const fromUSDToCent = amount => amount * 100; //Set to $$

const successPayment = data => {
//put logic for completed payment
};

const errorPayment = data => { //Ideally want to use this to redirect back to FinalView
  alert('Payment Error');
};

const onToken = (amount, description) => token => //Once Stripe Checkout token is created - post it using axios
  axios.post(PAYMENT_SERVER_URL,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUSDToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount, image }) => //Create User token for checkout
  <StripeCheckout
    name={name}
    image={image}
    description={description}
    amount={fromUSDToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />

export default Checkout;