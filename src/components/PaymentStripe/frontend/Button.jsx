//BLOOMTIME DESIGN 2019

import React,{Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';


class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch("/", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    });
    if (response.ok) {
      console.log("working")
      this.setState({complete: true});
    }else{
      alert('Payment Error')
    }
  }
  

  render() {
    if (this.state.complete) {
      return( <h1>Purchase Complete</h1> );
    } else {
    return (
      <div className="checkoutFormButton">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}
}

export default injectStripe(Button);
