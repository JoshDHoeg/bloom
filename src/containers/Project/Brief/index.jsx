// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import BriefView from './View';
import BriefEdit from './Edit';

class BriefPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        edit: false,
        brief: {
            goals: [],
            location: '',
            budget: '',
            narrative: ''
        },
        mediaURL:'',
        location: '',
        budget: 0,
        googleMaps: '',
    };

    this.updateBrief = this.updateBrief.bind(this);
    this.updateMedia = this.updateMedia.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateBudget = this.updateBudget.bind(this);
    this.updateGoogleMaps = this.updateGoogleMaps.bind(this);
  }

  updateBrief(){
    console.log("newBrief");
  }

  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();
  }

  updateMedia(event){
    event.preventDefault();
    this.setState({ mediaURL: event.target.value });
  }
  updateLocation(event){
    event.preventDefault();
    this.setState({ location: event.target.value });
  }
  updateBudget(event){
    event.preventDefault();
    this.setState({ budget: event.target.value });
  }
  updateGoogleMaps(event){
    event.preventDefault();
    this.setState({ googleMaps: event.target.value });
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject('userAuthID', true);
    const brief = await project.brief;
    const client = await project.client;
    const state = await {
        project: project,
        client: client,
        loading: false,
        brief: brief,
        location: brief.data.location,
        budget: brief.data.budget,
        googleMaps: "https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing",
        mediaURL: "https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing",
    }
    this.setState(state);
    return state;
}

  render() {
    if(this.state.edit){
        return (
            <BriefEdit 
              mediaURL={this.state.mediaURL} 
              location={this.state.location} 
              brief={this.state.brief} 
              budget={this.state.budget} 
              googleMaps={this.state.googleMaps} 
              updateMedia={this.updateMedia} 
              updateLocation={this.updateLocation} 
              updateBrief={this.updateBrief}
              updateBudget={this.updateBudget} 
              updateGoogleMaps={this.updateGoogleMaps} />      
        );
    }else{
        return (
            <BriefView 
            mediaURL={this.state.mediaURL} 
            location={this.state.location} 
            brief={this.state.brief}
            budget={this.state.budget} 
            googleMaps={this.state.googleMaps}/>      
        );
    }

  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(BriefPage);
