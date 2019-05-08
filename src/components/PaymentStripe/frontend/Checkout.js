  //BLOOMTIME DESIGN 2019
import axios from 'axios'; //Add this dependency
import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout'; //Add this dependency

//API KEYS
import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'USD'; //Set currency

const fromUSDToCent = amount => amount * 100; //Set to $$

//const SuccessPayment = data => { //  alert('Payment Success'); //put logic for completed payment
//    alert('Payment Success')
//    console.log('Success!')
//};


const errorPayment = data => { //Ideally want to use this to redirect back to FinalView 
  alert('Payment Error');
};

const onToken = (amount, description, SuccessPayment) => token => //Once Stripe Checkout token is created - post it using axios
  axios.post(PAYMENT_SERVER_URL,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUSDToCent(amount)
    })
    .then(
      SuccessPayment
    )
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
    SuccessPayment = {props.SuccessPayment}
  />
  


export default Checkout;