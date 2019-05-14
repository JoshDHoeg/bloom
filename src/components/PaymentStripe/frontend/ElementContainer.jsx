import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Button from './Button';

const stripe = require('./constants/stripe'); 

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey = {stripe}>
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <Button />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default App;