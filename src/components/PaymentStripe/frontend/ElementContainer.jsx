import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Button from './Button';
import { withAuthorization } from '../../../utilities/Session';

const stripe = require('./constants/stripeKey'); 

class ElementsContainer extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
      <StripeProvider apiKey = 'pk_test_7XARlGU7KhB75ysMvpSxfDvG00mtqr7j4s'>
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
             <Button /> 
          </Elements>
        </div>
      </StripeProvider>
      </div>
    );
  }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(ElementsContainer);