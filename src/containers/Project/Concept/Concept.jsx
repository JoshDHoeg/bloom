// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import ConceptPageView from './View/View';
import ConceptPageEdit from './Edit/Edit';

class ConceptPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        edit: false,
        concept: {},
        videoId: '',
        mediaURL: ''
    };

  this.updateMedia = this.updateMedia.bind(this);
  this.updateVideo = this.updateVideo.bind(this);
}
  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();
    
  }

  updateMedia(event){
    event.preventDefault();
    this.setState({ mediaURL: event.target.value });
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
        client: client,
        loading: false,
        videoId: concept.data.videoId,
        mediaURL: "https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing",
    }
    this.setState(state);
    return state;
}

  render() {
    console.log(this.state.concept);
    if(this.state.edit){
        return (
            <ConceptPageEdit mediaURL={this.state.mediaURL} videoId={this.state.videoId} updateMedia={this.updateMedia} updateVideo={this.updateVideo} />      
        );
    }else{
        return (
            <ConceptPageView mediaURL={this.state.mediaURL} videoId={this.state.videoId} />      
        );
    }

  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ConceptPage);