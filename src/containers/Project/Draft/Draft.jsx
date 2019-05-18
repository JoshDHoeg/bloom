// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import DraftPageView from './View/View';
import DraftPageEdit from './Edit/Edit';

class DraftPage extends Component {
  draft;
  concept;
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        edit: false,
        draft: {
          media:'',
          video: '',
          figma: '',
          feedback: '',
        },
        concept: {
          approved: false
        }
    };

    this.formSubmit = this.formSubmit.bind(this);
    this.completed = this.completed.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.Approved = this.Approved.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();
  }

  formSubmit(){
    console.log("we updated?", this.state);
    this.draft.media = this.state.draft.media;
    this.draft.video = this.state.draft.video;
    this.draft.figma = this.state.draft.figma;
    this.draft.feedback = this.state.draft.feedback;
  }

  completed(){
    this.draft.completed = true;
    this.formSubmit();
  }

  Approved() {
    this.draft.approved = true;
    console.log('approved?', this.draft.approved)
  }
  
  handleChange(event) {
    event.preventDefault();
    console.log(event.target.name);
    this.setState({
      draft: {
        ...this.state.draft,
        [event.target.name]: event.target.value
      }
    });
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
    this.draft = await project.draft;
    this.concept = await project.concept;
    const client = await project.client;
    const state = await {
        client: client,
        loading: false,
        draft: {
          ...this.draft.getAll()
        },
        concept: {
          ...this.concept.getAll()
        }

    }
    this.setState(state);
    return state;
}

  render() {
    if(this.state.edit){
        return (
            <DraftPageEdit draft={this.state.draft} completed={this.completed} handleChange={this.handleChange} formSubmit={this.formSubmit} />      
        );
    }else{
      console.log('approved', this.state.concept.approved)
        return (
            <DraftPageView concept={this.state.concept} formSubmit={this.formSubmit} Approved={this.Approved} isDesigner={this.props.firebase.user._isDesigner} draft={this.state.draft} />      
        );
    }

  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(DraftPage);