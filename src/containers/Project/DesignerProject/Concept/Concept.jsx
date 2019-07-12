// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../../utilities/Session/index';

import ConceptPageView from './View/View';
import ConceptPageEdit from './Edit/Edit';

class ConceptPage extends Component {
  concept;
  brief;
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
        brief:{
          completed:''
        }
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
    this.setState({
      concept: {
        ...this.state.concept,
        [event.target.name]: event.target.value
      }
    });
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
    this.concept = await project.concept;
    this.brief = await project.brief;
    const client = await project.client;
    const state = await {
        client: client,
        loading: false,
        concept: {
          ...this.concept.getAll()
        },
        brief:{
          ...this.brief.getAll()
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
            <ConceptPageView brief={this.state.brief} concept={this.state.concept} isDesigner={this.props.firebase.user._isDesigner}/>      
        );
    }

  }
}

const condition = role => role > 1;

export default withAuthorization(condition)(ConceptPage);
