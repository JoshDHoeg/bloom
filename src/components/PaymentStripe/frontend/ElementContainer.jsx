import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Form from './CheckoutForm';
import { withAuthorization } from '../../../utilities/Session';
import { Grid, Container, Segment, Header } from 'semantic-ui-react'
const stripe = require('./constants/stripeKey'); 

class ElementsContainer extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <Grid>
        <Container  textAlign='center' text='true'>
            <Grid.Row style={{ paddingTop: '20px' }}>
              <Header as='h2'>Purchase Design</Header>
            </Grid.Row>
            <Grid.Row style={{ paddingTop: '20px' }}>
              <Segment textAlign='left'>
                <StripeProvider apiKey = 'pk_test_7XARlGU7KhB75ysMvpSxfDvG00mtqr7j4s' >
                  <Elements>
                      <Form concept={this.props.concept}/> 
                  </Elements>
                </StripeProvider>
              </Segment>
            </Grid.Row>
          </Container>
      </Grid>
    );
  }
}
const condition = role => role > 0;

export default withAuthorization(condition)(ElementsContainer);