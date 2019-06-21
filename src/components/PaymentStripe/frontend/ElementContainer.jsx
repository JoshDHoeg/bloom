import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Form from './CheckoutForm';
import { withAuthorization } from '../../../utilities/Session';
import { Link } from 'react-router-dom';
import { Grid, Container, Segment, Header, Item } from 'semantic-ui-react'
import { library } from '@fortawesome/fontawesome-svg-core';
import ArrowRight from '../../../assets/images/icons/ArrowRight.svg';
import ArrowLeft from '../../../assets/images/icons/ArrowLeft.svg';
import { faArrowRight , faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ReactToolTip from 'react-tooltip'
library.add(faArrowRight)
library.add(faArrowLeft)
const stripe = require('./constants/stripeKey'); 

class ElementsContainer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log('hello', this.props.stage.stage)
    let RightArrow
    let LeftArrow
    if(this.props.stage.stage === 'concept' || this.props.stage.stage === 'draft'){
      RightArrow =
        <Link data-tip='go to rough draft' to="/project/user_draft" style={{position: "absolute", left: "90%", top: "250px"}}>
          <ReactToolTip/>
        <img src={ArrowRight}/>
        </Link>
      LeftArrow =
        <Link data-tip='go to concept design' to="/project/user_concept" style={{position: "absolute", right: "90%", top: "250px"}}>
        <img src={ArrowLeft}/>
        </Link>
    }if(this.props.stage.stage === 'final'){
      LeftArrow =
        <Link data-tip='go to rough draft' to="/project/user_draft" style={{position: "absolute", right: "90%", top: "250px"}}>
          <ReactToolTip/>
        <img src={ArrowLeft}/>
        </Link>
    }
    return (
      <Grid>
        {LeftArrow}
        <Container  textAlign='center' text='true'>
            <Grid.Row style={{ paddingTop: '20px' }}>
              <Header as='h1'>Purchase Design</Header>
            </Grid.Row>
            <Grid.Row style={{ paddingTop: '20px' }}>
              <Header as='h3'>Payment is due before delivery of your Final Designs</Header>
              <Item>If you don't want to complete payment now, you can find this page again in the menu in the upper right side of the site</Item>
            </Grid.Row>
            <Grid.Row style={{ paddingTop: '20px' }}>
              <Segment textAlign='left'>
                <StripeProvider apiKey = 'pk_live_wke7a6txnW6Zf4KrMKXaqKtA00z106DivU' >
                  <Elements>
                      <Form stage={this.props.stage} concept={this.props.concept}/> 
                  </Elements>
                </StripeProvider>
              </Segment>
            </Grid.Row>
          </Container>
          {RightArrow}
      </Grid>
    );
  }
}
const condition = role => role > 0;

export default withAuthorization(condition)(ElementsContainer);
