// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import FinalPageView from './View/View';
import FinalPageEdit from './Edit/Edit';

class FinalPage extends Component {
<<<<<<< HEAD
=======
  final;
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        edit: false,
<<<<<<< HEAD
        videoId: '',
        figmaURL: '',
        mediaURL: '',
    };

    this.updateVideo = this.updateVideo.bind(this);
    this.updateMedia = this.updateMedia.bind(this);
    this.updateFigma = this.updateFigma.bind(this);
=======
        final: {
          media:'',
          video: '',
          figma: '',
          feedback: ''
        }
    };

    this.formSubmit = this.formSubmit.bind(this);
    this.completed = this.completed.bind(this);
    this.handleChange = this.handleChange.bind(this);
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
  }

  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();
  }

<<<<<<< HEAD
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
=======
  formSubmit(){
    console.log("we updated?");
    this.final.media = this.state.final.media;
    this.final.video = this.state.final.video;
    this.final.figma = this.state.final.figma;
    this.final.feedback = this.state.final.feedback;
  }

  completed(){
    this.final.completed = true;
    this.formSubmit();
  }
  
  handleChange(event) {
    event.preventDefault();
    console.log(event.target.name);
    this.setState({
      final: {
        ...this.state.final,
        [event.target.name]: event.target.value
      }
    });
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, true);
    this.final = await project.final;
    const client = await project.client;
    const state = await {
        client: client,
        loading: false,
        final: {
          ...this.final.getAll()
        }
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
    }
    this.setState(state);
    return state;
}

  render() {
    if(this.state.edit){
        return (
<<<<<<< HEAD
            <FinalPageEdit mediaURL={this.state.mediaURL} figmaURL={this.state.figmaURL} videoId={this.state.videoId} updateMedia={this.updateMedia} updateFigma={this.updateFigma} updateVideo={this.updateVideo} />      
        );
    }else{
        return (
            <FinalPageView mediaURL={this.state.mediaURL} figmaURL={this.state.figmaURL} videoId={this.state.videoId} />      
=======
            <FinalPageEdit final={this.state.final} completed={this.completed} handleChange={this.handleChange} formSubmit={this.formSubmit} />      
        );
    }else{
        return (
            <FinalPageView final={this.state.final} />      
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
        );
    }

  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(FinalPage);