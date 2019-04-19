// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import BriefView from './View/View';
import BriefEdit from './Edit/Edit';

class BriefPage extends Component {
  brief;

  constructor(props) {
    super(props);
    this.state = {
        edit: false,
        loading: false,
        goals: [],
        address: '',
        budget: '',
        narrative: '',
        client: {
            name: '',
            client: false
        },
        googleMaps: "https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing",
        narrative: "https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing",
    };

    this.updateGoals = this.updateGoals.bind(this);
    this.updateMedia = this.updateMedia.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.updateBudget = this.updateBudget.bind(this);
    this.updateGoogleMaps = this.updateGoogleMaps.bind(this);
    this.updateNarrative = this.updateNarrative.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  formSubmit = () => {
    this.brief.budget = this.state.budget;
    this.brief.address = this.state.address;
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value});
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
  updateNarrative(event){
    event.preventDefault();
    this.setState({ narrative: event.target.value });
  }

  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, true);
    this.brief = await project.brief;
    const client = await project.client;
    const state = await {
        client: client,
        loading: false,
        ...this.brief.getAll()
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
              updateGoals={this.updateGoals}
              handleChange = {this.handleChange}
              formSubmit = {this.formSubmit} />      
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
