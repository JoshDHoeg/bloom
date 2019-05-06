//BLOOMTIME DESIGN 2019
import axios from 'axios'; //Add this dependency
<<<<<<< HEAD
import React, {Component} from 'react';
=======
import React from 'react';

>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
import StripeCheckout from 'react-stripe-checkout'; //Add this dependency

//API KEYS
import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'USD'; //Set currency

const fromUSDToCent = amount => amount * 100; //Set to $$

<<<<<<< HEAD
//const SuccessPayment = data => { //  alert('Payment Success'); //put logic for completed payment
//    alert('Payment Success')
//    console.log('Success!')
//};


const errorPayment = data => { //Ideally want to use this to redirect back to FinalView 
  alert('Payment Error');
};

const onToken = (amount, description, SuccessPayment) => token => //Once Stripe Checkout token is created - post it using axios
=======
const successPayment = data => {
  alert('Payment Success')
//put logic for completed payment
};


const errorPayment = data => { //Ideally want to use this to redirect back to FinalView
  alert('Payment Error');
};

const onToken = (amount, description) => token => //Once Stripe Checkout token is created - post it using axios
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
  axios.post(PAYMENT_SERVER_URL,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUSDToCent(amount)
    })
<<<<<<< HEAD
    .then(SuccessPayment)
    .catch(errorPayment);

const Checkout = (props) => //Create User token for checkout
  <StripeCheckout
    label={props.label}
    name={props.name}
    image={props.image}
    description={props.description}
    amount={fromUSDToCent(props.amount)}
    token={onToken(props.amount, props.description, props.SuccessPayment)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
    billingAddress={false}
  />


=======
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount, image, label }) => //Create User token for checkout
  <StripeCheckout
    label={label}
    name={name}
    image={image}
    description={description}
    amount={fromUSDToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />

>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
export default Checkout;