//BLOOMTIME DESIGN 2019
import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import {CardElement, injectStripe} from 'react-stripe-elements';
import PAYMENT_SERVER_URL from './constants/server';
import { withAuthorization } from '../../../utilities/Session';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ArrowRight from '../../../assets/images/icons/ArrowRight.svg';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Container,Segment, Header, Button, Grid, Item } from 'semantic-ui-react'
library.add(faArrowRight);
library.add(faArrowLeft);

class Form extends Component {
  concept;
  stage;
  constructor(props) {
    super(props);
    this.state={
      loading: false,
      edit: false,
      concept: {
        cost: '',
        isPaid: false,
      },
      stage: {
        stage: ''
      },
    }
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
    this.stateChange = this.stateChange.bind(this);
  }
  
  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      concept: {
        ...this.state.concept,
        [event.target.name]: event.target.value
      }
    });
  }

  stateChange = () => {
    this.concept.isPaid = true;
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let amt = this.props.amount*100;
    let response = await fetch('https://bloom-expressapi.herokuapp.com/payment', {
      method: "POST",
      headers: {"Content-Type": "application/json",
      'Access-Control-Allow-Origin':  'https://app.bloomtimedesign.co',
      //'Access-Control-Allow-Origin':  'http://localhost:3000',
      // 'Access-Control-Allow-Origin':  'https://bloom-prod.herokuapp.com'
    },
      body: JSON.stringify({
        amount: amt,
        token: token.id
      })
    });
    if (response.ok) {
      this.setState({complete: true});
      this.stateChange()
    }else{
      alert('Payment Error')
    }
  }
  
  render() {
    let amount;
    amount = this.props.amount
    let amount2;
    amount2 = amount*100;
    if (this.state.complete) {
      return( 
        <Container>
        <Grid>
          <Grid.Row style={{paddingTop: '25px', paddingBottom: '25px'}}>
            <Header as='h2' style={{ paddingLeft:'15px', paddingRight:'10px', fontSize:'20px'}}>Thank You For Your Purchase!</Header>
          </Grid.Row>
          <Grid.Row>
            <Item style={{ paddingLeft:'15px', paddingRight:'10px', fontSize:'10px'}}>Our designers will be working hard to deliver your design</Item>
          </Grid.Row>
        </Grid>
        </Container>
      );
    } else {
    return (
      <Grid>
        <Container fluid textAlign='left' text='true'>
        <Grid.Row style={{ paddingTop: '20px' }}>
          <Header as='h2' style={{ fontSize:'15px'}}>Please purchase your project for ${amount} to continue</Header>
        </Grid.Row>
        <Grid.Row style={{ paddingTop: '20px' }}>
          <Segment>
           <CardElement />
          </Segment>
        </Grid.Row>
          <Button animated='fade' onClick={this.submit} style={{backgroundColor:'#84DB95',marginTop:'15px', marginBottom: '15px'}}>
            <Button.Content visible>Purchase</Button.Content>
            <Button.Content hidden>${amount}</Button.Content>
          </Button>
        <Grid.Row>
          <Item style={{fontSize:'10px', paddingBottom:'10px'}}>Secure Method Using Stripe Payments</Item>
        </Grid.Row>
        </Container>
      </Grid>
    );
  }
}
}

const condition = role => role > 0;

export default  withAuthorization(condition)(injectStripe(Form));
