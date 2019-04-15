// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import FinalPageView from './View';
import FinalPageEdit from './Edit';

class FinalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        edit: false,
        videoId: ''
    };

    this.updateVideo = this.updateVideo.bind(this);
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

  updateFigma(event){
    event.preventDefault();
    this.setState({ videoId: event.target.value });
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject('userAuthID', true);
    const final = await project.final;
    const client = await project.client;
    const state = await {
        project: project,
        videoId: final.data.videoId,
        figmaURL: final.data.figmaURL,
        client: client,
        loading: false
    }
    this.setState(state);
    return state;
}

  render() {
    if(this.state.edit){
        return (
            <FinalPageEdit figmaURL={this.state.figmaURL} videoId={this.state.videoId} updateFigma={this.updateFigma} updateVideo={this.updateVideo} />      
        );
    }else{
        return (
            <FinalPageView figmaURL={this.state.figmaURL} videoId={this.state.videoId} />      
        );
    }

  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(FinalPage);