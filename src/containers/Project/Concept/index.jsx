// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import ConceptPageView from './View';
import ConceptPageEdit from './Edit';

class ConceptPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        edit: false,
        concept: {},
        videoId: ''
    };

  this.updateVideo = this.updateVideo.bind(this);
}
  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();
    
  }

  updateVideo(event){
    event.preventDefault();
    this.setState({ videoId: event.target.value });
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject('userAuthID', true);
    const concept = await project.concept;
    const client = await project.client;
    const state = await {
        project: project,
        videoId: concept.data.videoId,
        client: client,
        loading: false
    }
    this.setState(state);
    return state;
}

  render() {
    console.log(this.state.concept);
    if(this.state.edit){
        return (
            <ConceptPageEdit videoId={this.state.videoId} updateVideo={this.updateVideo}/>      
        );
    }else{
        return (
            <ConceptPageView videoId={this.state.videoId} />      
        );
    }

  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ConceptPage);