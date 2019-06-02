// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../../utilities/Session/index';

import ConceptPageView from './View/View';
import ConceptPageEdit from './Edit/Edit';

class ConceptPage extends Component {
  concept;
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        edit: false,
        concept: {
          media: '',
          video: '',
          feedback: '',
        },
    };

  this.handleChange = this.handleChange.bind(this);
  this.completed = this.completed.bind(this);
  this.formSubmit = this.formSubmit.bind(this);
}
  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();

  }

  formSubmit(){
    // console.log(this.state);
    this.concept.media = this.state.concept.media;
    this.concept.video = this.state.concept.video;
    this.concept.feedback = this.state.concept.feedback;
  }

  completed(){
    this.concept.completed = true;
    this.formSubmit();
  }
  
  handleChange(event) {
    event.preventDefault();
    // console.log(event.target.name);
    this.setState({
      concept: {
        ...this.state.concept,
        [event.target.name]: event.target.value
      }
    });
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
    // console.log(project);
    this.concept = await project.concept;
    // console.log(this.concept);
    const client = await project.client;
    const state = await {
        client: client,
        loading: false,
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
            <ConceptPageEdit concept={this.state.concept} completed={this.completed} handleChange={this.handleChange} formSubmit={this.formSubmit} />      
        );
    }else{
        return (
            <ConceptPageView concept={this.state.concept} isDesigner={this.props.firebase.user._isDesigner}/>      
        );
    }

  }
}

const condition = role => role > 0;

export default withAuthorization(condition)(ConceptPage);
