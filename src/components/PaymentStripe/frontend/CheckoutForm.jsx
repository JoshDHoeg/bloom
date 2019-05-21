//BLOOMTIME DESIGN 2019
import { Button } from 'semantic-ui-react'
import React,{Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import PAYMENT_SERVER_URL from './constants/server';
class PaymentButton extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    console.log(token)
    let response = await fetch(PAYMENT_SERVER_URL, {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    });
    if (response.ok) {
      console.log("working")
      this.setState({complete: true});
    }else{
      alert('Payment Error')
      console.log(response)
    }
  }


  render() {
    if (this.state.complete) {
      return( <h1>Purchase Complete</h1> );
    } else {
    return (
      <div className="checkoutFormButton">
        <h3 style={{ fontSize:'16px', color:'#FA907F', fontFamily:'sans-serif'}}>Would you like to purchase your final design?</h3>
        <CardElement />
        <Button animated='fade' onClick={this.submit} style={{marginTop:'15px', marginBottom: '5px'}}>
          <Button.Content visible>Purchase</Button.Content>
          <Button.Content hidden>$599.99</Button.Content>
        </Button>
      </div>
    );
  }
}
}

export default injectStripe(PaymentButton);
