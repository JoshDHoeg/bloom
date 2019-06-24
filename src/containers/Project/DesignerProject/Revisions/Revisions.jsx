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


  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
    this.revisions = await project.revisions;
    let string = this.props.location.pathname;
    var array = string.split("/");
    var currentRevision = array[3]
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
            <RevisionsPageEdit revision={this.state.revision} completed={this.completed} handleChange={this.handleChange} formSubmit={this.formSubmit} />
        );
    }else{
        return (
            <RevisionsPageView Approved={this.Approved} final={this.state.final} completed={this.completed} isDesigner={this.props.firebase.user._isDesigner} revision={this.state.revision} />
        );
    }

  }
}

const condition = role => role > 0
export default withAuthorization(condition)(RevisionsPage);
