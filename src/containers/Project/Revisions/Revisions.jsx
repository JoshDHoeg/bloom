// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
//import { SuccessPayment } from '../../../components/PaymentStripe/frontend/Checkout.js';
//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import RevisionsPageView from './View/View';
import RevisionsPageEdit from './Edit/Edit';

class RevisionsPage extends Component {
  revision;
  final;
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        edit: false,
        figmaURL: '',
        mediaURL: '',
        revision: {
          media:'',
          figma: '',
          feedback: ''
        },
        final:{
          approved: false
        }
    };
    this.completed = this.completed.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.Approved = this.Approved.bind(this);
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

  formSubmit(){
    console.log("we updated?");
    this.revision.media = this.state.revision.media;
    this.revision.figma = this.state.revision.figma;
    this.revision.feedback = this.state.revision.feedback;
  }

  Approved() {
    this.revision.approved = true;
    console.log('approved?', this.revision.approved)
  }

  completed(){
    this.final.completed = true;
    this.formSubmit();
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
    console.log(project);
    this.revision = await project.revision;
    this.final = await project.final;
    console.log(this.revision);
    const client = await project.client;
    const state = await {
        client: client,
        loading: false,
//        isPaid: this.revision.isPaid,
        revision: {
          ...this.revision.getAll()
        },
        final: {
          ...this.final.getAll()
        }
    }

    this.setState(state);
    return state;
}

  render() {
    console.log('props:', this.props)
    console.log('isPaid:', this.isPaid)
    if(this.state.edit){
        return (
            <RevisionsPageEdit revision={this.state.revision} completed={this.completed} handleChange={this.handleChange} formSubmit={this.formSubmit} />      
        );
    }else{
        return (
            <RevisionsPageView Approved={this.Approved} final={this.state.final} completed={this.completed} isDesigner={this.props.firebase.user._isDesigner} revision={this.state.revision} />
        );
    }

  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(RevisionsPage);
