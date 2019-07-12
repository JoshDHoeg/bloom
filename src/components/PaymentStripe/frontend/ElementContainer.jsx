import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Form from './CheckoutForm';
import { withAuthorization } from '../../../utilities/Session';
import { Link } from 'react-router-dom';
import { Grid, Container, Segment, Header, Item, Divider } from 'semantic-ui-react'
import { library } from '@fortawesome/fontawesome-svg-core';
import ArrowRight from '../../../assets/images/icons/ArrowRight.svg';
import ArrowLeft from '../../../assets/images/icons/ArrowLeft.svg';
import { faArrowRight , faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ReactToolTip from 'react-tooltip'
library.add(faArrowRight)
library.add(faArrowLeft)



class ElementsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      amount:''
    }
  }

  render() {
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
        <Link data-tip='go to rough draft' to="/project/user_draft" style={{backgroundColor:'white',position: "absolute", right: "90%", top: "250px"}}>
          <ReactToolTip/>
        <img src={ArrowLeft}/>
        </Link>
    }
    const stripe = process.env.REACT_APP_STRIPE_PRIVATE
    let amount2;
    let cost = parseFloat(Math.round(this.props.concept.cost) / 100).toFixed(2);
    console.log('amount', stripe)
    this.state.amount = cost - (this.props.concept.discount + this.props.concept.deposit);
    let upgrade = (cost - 599.99);
    let Area = upgrade/.4;
    console.log(this.props.concept.deposit)
    return (
      <Grid columns='two' style={{marginTop:'5%', paddingLeft:'10%', paddingRight:'10%'}}>
        {LeftArrow}
        <Grid.Row>
          <Grid.Column>
            <Container>
              <Header>
                Hi {this.props.user.name}!
              </Header>
              <Item>
                {this.props.user.billadd1}
              </Item>
              <Item>
                Your balance of ${this.state.amount} is due before we deliver your final designs. You can pay at any time.
              </Item>
            </Container>
          </Grid.Column>
        </Grid.Row>
        <Divider/>
        <Grid.Row style={{paddingTop:'0px', paddingBottom:'0px'}}>
          <Grid.Column>
            <Container>
              <Header floated='left' as='h3'>Item:</Header>
            </Container>
          </Grid.Column>
          <Grid.Column>
            <Container>
              <Header floated='right' as='h3'>Price:</Header>
            </Container>
          </Grid.Column>
        </Grid.Row>
        <Divider/>
        <Grid.Row style={{paddingTop:'0px', paddingBottom:'0px'}}>
          <Grid.Column>
            <Container>
              <Item style={{textAlign:'left'}}>Design Fee</Item>
              <Item style={{textAlign:'left'}}>Area Upgrade - {Area} square feet at $0.40/s.f.</Item>
              <Item style={{textAlign:'left'}}>Discount (if applicable)</Item>
            </Container>
            <Container>
              <Divider style={{width:'35%'}}/>
            </Container>
          </Grid.Column>
          <Grid.Column>
            <Container>
              <Item style={{textAlign:'right'}}>$599.99</Item>
              <Item style={{textAlign:'right'}}>+${upgrade}</Item>
              <Item style={{textAlign:'right'}}>-${this.props.concept.discount}</Item>
            </Container>
            <Container>
              <Divider style={{width:'10%', marginRight:'0px', marginLeft:'auto'}}/>
            </Container>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{paddingTop:'0px', paddingBottom:'0px'}}>
          <Grid.Column>
            <Container>
              <Item style={{textAlign:'left'}}>Deposit Received</Item>
            </Container>
          </Grid.Column>
          <Grid.Column>
            <Container>
              <Item style={{textAlign:'right'}}>-${this.props.concept.deposit}</Item>
            </Container>
          </Grid.Column>
        </Grid.Row>
        <Divider/>
        <Grid.Row>
          <Grid.Column>
            <Container>
              <Header style={{textAlign:'left'}}>Total Due</Header>
            </Container>
          </Grid.Column>
          <Grid.Column>
            <Container>
              <Header style={{textAlign:'right'}}>${this.state.amount}</Header>
            </Container>
          </Grid.Column>
        </Grid.Row>
        <Divider/>
        <Grid.Row style={{ paddingTop: '10px', paddingLeft:'15px' }}>
            <StripeProvider apiKey = {stripe} >
              <Elements>
                  <Form amount={this.state.amount} stage={this.props.stage} concept={this.props.concept}/>
              </Elements>
            </StripeProvider>
        </Grid.Row>
        {RightArrow}
      </Grid>
      // <Grid>
      //   {LeftArrow}
      //   <Grid.Row>
      //     <div style={{ backgroundColor: "white", border: '1px solid grey', borderRadius: "16px", padding:'10px'}}>
      //         <Grid.Row style={{ paddingTop: '20px', textAlign:'center' }}>
      //           <Header as='h1'>Purchase Design</Header>
      //         </Grid.Row>
      //         <Grid.Row style={{ paddingTop: '20px', textAlign:'center' }}>
      //           <Header as='h3'>Payment is due before delivery of your Final Designs</Header>
      //           <Item>If you don't want to complete payment now, you can find this page again in the menu in the upper right side of the site</Item>
      //         </Grid.Row>
      //         <Grid.Row style={{ paddingTop: '20px' }}>
      //             <StripeProvider apiKey = 'pk_live_wke7a6txnW6Zf4KrMKXaqKtA00z106DivU' >
      //               <Elements>
      //                   <Form stage={this.props.stage} concept={this.props.concept}/>
      //               </Elements>
      //             </StripeProvider>
      //         </Grid.Row>
      //       </div>
      //     </Grid.Row>
      //     {RightArrow}
      // </Grid>

    );
  }
}
const condition = role => role > 0;

export default withAuthorization(condition)(ElementsContainer);
