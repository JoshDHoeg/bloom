//BLOOMTIME DESIGN 2019
import { Button } from 'semantic-ui-react'
import React,{Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import PAYMENT_SERVER_URL from './constants/server';
import { withAuthorization } from '../../../utilities/Session';

class PaymentButton extends Component {
  concept;
  constructor(props) {
    super(props);
    this.state={
      loading: false,
      edit: false,
      concept: {
      cost: '',
      }
    }
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }
  
  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    if(this.props.location.state){
      this.setState({projectIndex: this.props.location.state.projectIndex});
      this.getProjectState(this.props.location.state.projectIndex);
    } else{
      this.setState({projectIndex: 0});
      this.getProjectState(0);
    }
  }

  handleChange(event) {
    event.preventDefault();
    console.log(event.target.name);
    this.setState({
      final: {
        ...this.state.revision,
        [event.target.name]: event.target.value
      }
    });
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
    this.concept = await project.concept;
    const state = await {
        client: client,
        loading: false,
        concept: {
          ...this.concept.getAll()
        },
    }
    console.log('1',this.concept.cost)
    this.setState(state);
    return state;

  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    console.log('amount', this.state.concept.cost)
    let amt = this.state.concept.cost;
    let response = await fetch(PAYMENT_SERVER_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        amount: amt,
        token: token.id
      })
    });
    if (response.ok) {
      console.log("working")
      this.setState({complete: true});
      this.state.concept.isPaid = true
      console.log(this.concept.isPaid)
      console.log(response)
    }else{
      alert('Payment Error')
    }
  }


  render() {
    if (this.state.complete) {
      return( <h3 style={{ fontSize:'16px', color:'#FA907F', fontFamily:'sans-serif'}}>Purchase Complete</h3> );
    } else {
    return (
      <div className="checkoutFormButton">
        <h3 style={{ fontSize:'16px', color:'#FA907F', fontFamily:'sans-serif'}}>Would you like to purchase your design?</h3>
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
const condition = authUser => !!authUser;

export default  withAuthorization(condition)(injectStripe(PaymentButton));
