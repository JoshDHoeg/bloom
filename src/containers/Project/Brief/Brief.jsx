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

  componentDidMount() {
    this.setState({ loading: true, edit: this.props.edit });
    this.getProjectState();
  }

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
    this.setState(state);
    return state;
}

  render() {

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
        );
    }

  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(BriefPage);
