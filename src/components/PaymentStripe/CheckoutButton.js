import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';


class CheckoutButton extends Component {
    constructor(props) {
        super(props);
        this.state = {complete: false};
        this.response=false;
    }

    onToken = (token) => {
        fetch("http://localhost:9000/charge", {
          method: 'POST',
          headers: {"Content=Type": "text/plain"},
          body: token.id,
          response: true,
          mode: 'cors',
          headers:{'Access-Control-Allow-Origin':'*'
          }
        }).then(response => {
          response.json().then(data => {
            alert(`We are in business, ${data.email}`);
          });
        })
        if (token) console.log("Purchase Complete!")
    }   

    render() {
        if(this.state.complete) return <h1>Purchase Complete</h1>
        return (
            <div>
                <StripeCheckout
                ComponentClass="div"
                label="Unlock"
                amount={59900}
                panelLabel="Final Design {{amount}}"
                billingAddress={false}
                description="Purchase Final Design"
                currency="USD"
                locale="auto"
                name="Bloomtime Design"
                stripeKey="pk_test_GMMhmoJNDkVLUtxaz5UmJUtV00iGQ5ZRrA"
                token={this.onToken}
                zipcode={false}
                triggerEvent="onClick"
                />
            </div>
            );
    }
}


export default (CheckoutButton);
