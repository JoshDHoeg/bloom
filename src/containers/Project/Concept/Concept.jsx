// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import ConceptPageView from './View/View';
import ConceptPageEdit from './Edit/Edit';

class ConceptPage extends Component {
<<<<<<< HEAD
=======
  concept;
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        edit: false,
<<<<<<< HEAD
        concept: {},
        videoId: '',
        mediaURL: ''
    };

  this.updateMedia = this.updateMedia.bind(this);
  this.updateVideo = this.updateVideo.bind(this);
=======
        concept: {
          media: '',
          video: '',
          feedback: '',
        },
    };

  this.handleChange = this.handleChange.bind(this);
  this.completed = this.completed.bind(this);
  this.formSubmit = this.formSubmit.bind(this);
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
}
  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();
    
  }

<<<<<<< HEAD
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
=======
  formSubmit(){
    console.log("we updated?");
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
    console.log(event.target.name);
    this.setState({
      concept: {
        ...this.state.concept,
        [event.target.name]: event.target.value
      }
    });
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, true);
    console.log(project);
    this.concept = await project.concept;
    console.log(this.concept);
    const client = await project.client;
    const state = await {
        client: client,
        loading: false,
        concept: {
          ...this.concept.getAll()
        }
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
    }
    this.setState(state);
    return state;
}

  render() {
    console.log(this.state.concept);
    if(this.state.edit){
        return (
<<<<<<< HEAD
            <ConceptPageEdit mediaURL={this.state.mediaURL} videoId={this.state.videoId} updateMedia={this.updateMedia} updateVideo={this.updateVideo} />      
        );
    }else{
        return (
            <ConceptPageView mediaURL={this.state.mediaURL} videoId={this.state.videoId} />      
=======
            <ConceptPageEdit concept={this.state.concept} completed={this.completed} handleChange={this.handleChange} formSubmit={this.formSubmit} />      
        );
    }else{
        return (
            <ConceptPageView concept={this.state.concept} />      
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
        );
    }

  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ConceptPage);