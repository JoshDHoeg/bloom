// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
//import { SuccessPayment } from '../../../components/PaymentStripe/frontend/Checkout.js';
//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../../utilities/Session/index';

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
    this.getProjectState();
  }

  formSubmit(){
    this.revisions[this.state.currentRevision].media =this.state.revision.media;
    this.revisions[this.state.currentRevision].figma =this.state.revision.figma;
    this.revisions[this.state.currentRevision].feedback =this.state.revision.feedback;
  }

  Approved() {
    this.revision.approved = true;
  }

  completed(){
    this.final.completed = true;
    this.formSubmit();
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      revision: {
        ...this.state.revision,
        [event.target.name]: event.target.value
      }
    });
  }
  
  handleStateChange = () => {
    this.setState({
        stage: []
    })
    this.getProjectState();
  }


  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
    this.revisions = await project.revisions;
    let string = this.props.location.pathname;
    var array = string.split("/");
    var currentRevision = array[3];
<<<<<<< HEAD
    console.log('current revision', currentRevision);
=======
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
    this.final = await project.final;
    const client = await project.client;
    const state = await {
        client: client,
        revision: this.revisions[currentRevision].data,
        loading: false,
        final: {
          ...this.final.getAll()
        },
        currentRevision: currentRevision
    }

    this.setState(state);
    return state;
}

  render() {
    if(this.state.edit){
        return (
            <RevisionsPageEdit currentRevision={this.state.currentRevision} handleStateChange={this.handleStateChange} revision={this.state.revision} completed={this.completed} handleChange={this.handleChange} formSubmit={this.formSubmit} />
        );
    }else{
        return (
            <RevisionsPageView currentRevision={this.state.currentRevision} handleStateChange={this.handleStateChange} Approved={this.Approved} final={this.state.final} completed={this.completed} isDesigner={this.props.firebase.user._isDesigner} revision={this.state.revision} />
        );
    }

  }
}

const condition = role => role > 1;
export default withAuthorization(condition)(RevisionsPage);
