//BLOOMTIME DESIGN 2019
import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import {CardElement, injectStripe} from 'react-stripe-elements';
import PAYMENT_SERVER_URL from './constants/server';
import { withAuthorization } from '../../../utilities/Session';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ArrowRight from '../../../assets/images/icons/ArrowRight.svg';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Container,Segment, Header, Button, Grid } from 'semantic-ui-react'
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
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
    this.concept = await project.concept;
    this.stage = await project.stage;
    const state = await {
        loading: false,
        concept: {
          ...this.concept.getAll(),
        },
        stage: {
          stage: this.stage.stage
        }
    }
    this.setState(state);
    return state;

  }

  async submit(ev) { //api post method for payment
    let {token} = await this.props.stripe.createToken({name: "Name"}); //creating token from stripe
    let amt = this.state.concept.cost; //setting the amount state
    let response = await fetch('https://bloom-expressapi.herokuapp.com/payment', { //fetching from backend url
      method: "POST", 
      headers: {"Content-Type": "application/json",
      'Access-Control-Allow-Origin':  'https://app.bloomtimedesign.co',
      //'Access-Control-Allow-Origin':  'http://localhost:3000',
      // 'Access-Control-Allow-Origin':  'https://bloom-prod.herokuapp.com'
    },
      body: JSON.stringify({ //used to concatenate data
        amount: amt,
        token: token.id
      })
    });
    if (response.ok) {
      this.setState({complete: true});
      this.stateChange()
    }else{
      alert('Payment Error') //give error message if the payment does not go through
    }
  }
  
  render() {
    let amount;
    amount = this.props.concept.cost
    let amount2;
    amount2 = parseFloat(Math.round(amount) / 100).toFixed(2);
    if (this.state.complete) {
      return( 
        <Grid>
          <Grid.Row style={{paddingTop: '25px', paddingBottom: '25px'}}>
            <Header as='h2' style={{ paddingLeft:'10px', paddingRight:'10px', fontSize:'15px'}}>Purchase Complete!</Header>
              <Link to="/project/user_draft" style={{position: "absolute", left: "90%", top: "250px"}}>
              <img src={ArrowRight}/></Link>
          </Grid.Row>
        </Grid>
      );
    } else {
    return (
      <Grid>
        <Container fluid textAlign='left' text='true'>
        <Grid.Row style={{ paddingTop: '20px' }}>
          <Header as='h2' style={{ fontSize:'15px'}}>Please purchase your project for ${amount2} to continue</Header>
        </Grid.Row>
        <Grid.Row style={{ paddingTop: '20px' }}>
          <Segment>
           <CardElement />
          </Segment>
        </Grid.Row>
          <Button animated='fade' onClick={this.submit} style={{backgroundColor:'#84DB95',marginTop:'15px', marginBottom: '15px'}}>
            <Button.Content visible>Purchase</Button.Content>
            <Button.Content hidden>${amount2}</Button.Content>
          </Button>
        </Container>
      </Grid>
    );
  }
}
}

const condition = role => role > 0;

export default  withAuthorization(condition)(injectStripe(Form));
