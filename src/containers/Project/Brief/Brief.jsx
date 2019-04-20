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
        mediaURL: 'fuck?',
    };

    this.updateGoals = this.updateGoals.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  formSubmit = () => {
    this.brief.budget = this.state.budget;
    this.brief.address = this.state.address;
    this.brief.narrative = this.state.narrative;
  }

  handleChange(event) {
    event.preventDefault();
    console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value});
  }

  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();
  }

  updateGoals(event){
    event.preventDefault();
    this.setState({ goals: event.target.value });
  }

  deleteGoal = (id) => {
    const Goals = this.state.goals.filter(goal => {
        return goal.id !== id;
    })
    this.setState({"goals": Goals})
}

editGoal = (id) => {
    this.setState({editId: id});
}

editGoalSubmit = (goal) =>{
    console.log(goal);
    this.setState(state => {
        const goals = state.goals.map(goalCurrent => {
            if(goalCurrent.id === goal.id){
                // console.log(goal.content);
                return goal;
            }else{
                // console.log(goalCurrent.content);
                return goalCurrent;
            }
        });
        console.log(goals);
        return {
            goals: goals,
            editId: ''
        };
    });
}

addGoal = (goal) => {
    console.log(goal);
    goal.id= Math.random();
    let goals = [...this.state.goals, goal];
    this.setState({
        goals: goals
    });
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
