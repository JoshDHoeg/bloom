// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import FinalPageView from './View/View';
import FinalPageEdit from './Edit/Edit';

class FinalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        edit: false,
        videoId: '',
        figmaURL: '',
        mediaURL: '',
    };

    this.updateVideo = this.updateVideo.bind(this);
    this.updateMedia = this.updateMedia.bind(this);
    this.updateFigma = this.updateFigma.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();
  }

  updateVideo(event){
    event.preventDefault();
    this.setState({ videoId: event.target.value });
  }

  updateMedia(event){
    event.preventDefault();
    this.setState({ mediaURL: event.target.value });
  }

  updateFigma(event){
    event.preventDefault();
    this.setState({ figmaURL: event.target.value });
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject('userAuthID', true);
    const final = await project.final;
    const client = await project.client;
    const state = await {
        project: project,
        client: client,
        loading: false,
        videoId: final.data.videoId,
        figmaURL: final.data.figmaURL,
        mediaURL: "https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing",
    }
    this.setState(state);
    return state;
}

  render() {
    if(this.state.edit){
        return (
            <FinalPageEdit mediaURL={this.state.mediaURL} figmaURL={this.state.figmaURL} videoId={this.state.videoId} updateMedia={this.updateMedia} updateFigma={this.updateFigma} updateVideo={this.updateVideo} />      
        );
    }else{
        return (
            <FinalPageView mediaURL={this.state.mediaURL} figmaURL={this.state.figmaURL} videoId={this.state.videoId} />      
        );
    }

  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(FinalPage);