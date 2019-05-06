// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import BriefView from './View/View';
import BriefEdit from './Edit/Edit';

class BriefPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        edit: false,
        goals: [],
        mediaURL:'',
        address: '',
        budget: '',
        googleMaps: '',
        narrative: '',
    };

    this.updateGoals = this.updateGoals.bind(this);
    this.updateMedia = this.updateMedia.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.updateBudget = this.updateBudget.bind(this);
    this.updateGoogleMaps = this.updateGoogleMaps.bind(this);
    this.updateNarrative = this.updateNarrative.bind(this);
  }


  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();
  }

  updateMedia(event){
    event.preventDefault();
    this.setState({ mediaURL: event.target.value });
  }
  updateGoals(event){
    event.preventDefault();
    this.setState({ goals: event.target.value });
  }
  updateAddress(event){
    event.preventDefault();
    this.setState({ address: event.target.value });
  }
  updateBudget(event){
    event.preventDefault();
    this.setState({ budget: event.target.value });
  }
  updateGoogleMaps(event){
    event.preventDefault();
    this.setState({ googleMaps: event.target.value });
  }
  updateNarrative(event){
    event.preventDefault();
    this.setState({ narrative: event.target.value });
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject('userAuthID', true);
    const brief = await project.brief;
    console.log(brief);
    const client = await project.client;
    const state = await {
        project: project,
        client: client,
        loading: false,
        brief: brief,
        address: brief.data.location,
        budget: brief.data.budget,
        narrative: brief.data.narrative,
        goals: brief.data.goals,
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
              address={this.state.address} 
              goals={this.state.goals} 
              budget={this.state.budget} 
              googleMaps={this.state.googleMaps} 
              narrative={this.state.narrative} 
              updateMedia={this.updateMedia} 
              updateAddress={this.updateAddress} 
              updateGoals={this.updateGoals}
              updateBudget={this.updateBudget} 
              updateGoogleMaps={this.updateGoogleMaps}
              updateNarrative={this.updateNarrative} />      
        );
    }else{
        return (
            <BriefView 
            mediaURL={this.state.mediaURL} 
            address={this.state.address} 
            goals={this.state.goals}
            budget={this.state.budget} 
            googleMaps={this.state.googleMaps}
            narrative={this.state.narrative} />      
        );
    }

  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(BriefPage);
