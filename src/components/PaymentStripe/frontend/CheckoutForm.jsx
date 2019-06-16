//BLOOMTIME DESIGN 2019
import { Button } from 'semantic-ui-react'
import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import {CardElement, injectStripe} from 'react-stripe-elements';
import PAYMENT_SERVER_URL from './constants/server';
import { withAuthorization } from '../../../utilities/Session';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ArrowRight from '../../../assets/images/icons/ArrowRight.svg';
import { library } from '@fortawesome/fontawesome-svg-core';
//import axios from 'axios';
library.add(faArrowRight);
library.add(faArrowLeft);

class PaymentButton extends Component {
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
    this.setState({
      concept: {
        ...this.state.concept,
        [event.target.name]: event.target.value
      }
    });
  }

  stateChange = () => {
    this.concept.isPaid = true;
    this.stage.stage = 'draft';
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
    this.concept = await project.concept;
    this.stage = await project.stage;
    const state = await {
        loading: false,
        concept: {
          ...this.concept.getAll()
        },
        stage: {
          stage: this.stage.stage
        }
    }
    this.setState(state);
    return state;

  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let amt = this.state.concept.cost;
    let response = await fetch(PAYMENT_SERVER_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json",
      'Access-Control-Allow-Origin':  'https://app.bloomtimedesign.co',
      'Access-Control-Allow-Origin':  'https://bloom-userui.herokuapp.com',
      'Access-Control-Allow-Origin':  'https://bloom-prod.herokuapp.com'
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
    if (this.state.complete) {
      return( 
        <div>
          <h3 style={{ fontSize:'16px', color:'#FA907F', fontFamily:'sans-serif'}}>Purchase Complete</h3> 
            <Link to="/project/user_draft" style={{position: "absolute", left: "90%", top: "250px"}}>
            <img src={ArrowRight}/></Link>
        </div>
      );
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

const condition = role => role > 0;

export default  withAuthorization(condition)(injectStripe(PaymentButton));
