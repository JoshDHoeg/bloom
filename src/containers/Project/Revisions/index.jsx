// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import RevisionsPageView from './View';
import RevisionsPageEdit from './Edit';

class RevisionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        edit: false,
        figmaURL: '',
        mediaURL: '',
    };

    this.updateFigma = this.updateFigma.bind(this);
    this.updateMedia = this.updateMedia.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();
  }


  updateFigma(event){
    event.preventDefault();
    this.setState({ figmaURL: event.target.value });
  }

  updateMedia(event){
    event.preventDefault();
    this.setState({ mediaURL: event.target.value });
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject('userAuthID', true);
    const revision = await project.revision;
    const client = await project.client;
    const state = await {
        project: project,
        client: client,
        loading: false,
        figmaURL: revision.data.figmaURL,
        mediaURL: "https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing",
    }
    this.setState(state);
    return state;
}

  render() {
    if(this.state.edit){
        return (
            <RevisionsPageEdit  figmaURL={this.state.figmaURL} updateFigma={this.updateFigma}  mediaURL={this.state.mediaURL} updateMedia={this.updateMedia}/>      
        );
    }else{
        return (
            <RevisionsPageView  figmaURL={this.state.figmaURL} mediaURL={this.state.mediaURL} />      
        );
    }

  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(RevisionsPage);