// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../../utilities/Session';

import BriefView from './View/View';
import BriefEdit from './Edit/Edit';

class BriefPage extends Component {
<<<<<<< HEAD
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

=======
  brief;

  constructor(props) {
    super(props);
    this.state = {
        edit: false,
        editId: '',
        loading: false,
        brief:{
          goals: [],
          address: '',
          budget: '',
          narrative: '',
          media: '',
        },
        client: {
            name: '',
            client: false
        },
    };

    this.formSubmit = this.formSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setLive = this.setLive.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);
    this.editGoalSubmit = this.editGoalSubmit.bind(this);
    this.editGoal = this.editGoal.bind(this);
    this.addGoal = this.addGoal.bind(this);
  }

  formSubmit = () => {
    this.brief.media = this.state.brief.media;
    this.brief.goals = this.state.brief.goals;
    this.brief.address = this.state.brief.address;
    this.brief.budget = this.state.brief.budget; 
    this.brief.narrative = this.state.brief.narrative;
  }

  handleChange(event) {
    event.preventDefault();
    // console.log(event.target.name);
    this.setState({
      brief: {
        ...this.state.brief,
        [event.target.name]: event.target.value
      }
    });
  }

  setLive(){
    this.brief.completed = true;
    this.formSubmit();
  }
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c

  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();
  }

<<<<<<< HEAD
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
=======
  deleteGoal = (id) => {
    const Goals = this.state.brief.goals.filter(goal => {
        return goal.id !== id;
    })
    this.setState({brief:{...this.state.brief, goals: Goals}});
    console.log(Goals);
  }

  editGoal(id){
    // console.log("edit goal");
      this.setState({editId: id});
  }

  editGoalSubmit = (goal) =>{
    // console.log(goal);
    this.setState(state => {
        const Goals = state.brief.goals.map(goalCurrent => {
            if(goalCurrent.id === goal.id){
                // console.log(goal.content);
                return goal;
            }else{
                // console.log(goalCurrent.content);
                return goalCurrent;
            }
        });
        console.log(Goals);
        return {
            brief:{...this.state.brief, goals: Goals},
            editId: ''
        };
    });
  }

  addGoal = (goal) => {
      // console.log(goal);
      goal.id= Math.random();
      let Goals = [...this.state.brief.goals, goal];
      this.setState({brief:{...this.state.brief, goals: Goals}});
  }


  getProjectState = async () => {
    const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, true);
    console.log(project);
    this.brief = await project.brief;
    console.log(this.brief);
    const client = await project.client;
    const state = await {
        client: client,
        loading: false,
        brief: {
          ...this.brief.getAll()
        }
    }
    // console.log(state);
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
    this.setState(state);
    return state;
}

  render() {
<<<<<<< HEAD
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
=======

    if(this.state.edit){
        return (
            <BriefEdit 
              brief = {this.state.brief}
              editId={this.state.editId}
              
              addGoal={this.addGoal}
              editGoal={this.editGoal}
              editGoalSubmit={this.editGoalSubmit}
              deleteGoal={this.deleteGoal}
              setLive = {this.setLive}
              handleChange = {this.handleChange}
              formSubmit = {this.formSubmit} />      
        );
    }else{
        return (
            <BriefView brief = {this.state.brief} />      
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
        );
    }

  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(BriefPage);
