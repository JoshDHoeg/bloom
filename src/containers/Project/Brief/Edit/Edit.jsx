// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import * as ROUTES from "../../../../utilities/constants/routes";

import backgroundTemp from '../../../../Images/TempBackground.PNG';

import GoalList from '../Components/GoalList/GoalList';
import DetailList from '../Components/DetailList/DetailList';
import Narrative from '../Components/Narrative/Narrative';
import TasteProfile from '../Components/TasteProfile/TasteProfile';


class BriefPageEdit extends Component {
    constructor(props) {
        super(props);
        this.state={
            edit: true,
            list: ['1', '2', '3'],
            editId: '',
            goals:[
                {id: 1, content: "buy some milk"},
                {id: 2, content: "play mario cart"},
            ]
        }

    }

    deleteGoal = (id) => {
        const Goals = this.state.goals.filter(goal => {
            return goal.id !== id;
        })

        this.setState({"goals": Goals})
    }

    editGoal = (id) => {
        this.setState({editId: id});
        console.log(id);
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

    onUpdateItems = (event) => {
        
        let index = parseInt(event.target.id);
        let value = event.target.value;
        console.log(value);
        console.log(index);
        this.setState(state => {
            const list = state.list.map((item, j) => {
              if (j === index) {
                return value;
              } else {
                return item;
              }
            });
            console.log(list)
            return {
              list,
            };
          });
      };

    render() {
        console.log(this.props);
        return (
            <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px" }}>
                <div className="ui stackable grid container">
                    <div className="row" style={{ paddingTop: "40px" }}>
                        <h1>Design Brief</h1>
                        <button type="button" style={{ backgroundColor: "#27AE60", marginLeft: "225px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_BRIEF} style={{ textDecoration: 'none', color: "white" }} >Done</Link></button>
                        <button type="button" style={{ backgroundColor: "#56CCF2", marginLeft: "20px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><a target="_blank" rel="noopener noreferrer" href={this.props.mediaURL} style={{ textDecoration: 'none', color: "white" }}>Media</a></button>
                    </div>
                    <div className="row">
                        <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h2 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Media Link</h2>
                            <input type="text" onChange={this.props.updateMedia} value={this.props.mediaURL}/>   
                        </span>
                    </div>
                    <div className="row">
                        <span style={{ marginRight: "25px", width: "275px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Goals</h1>
                            <GoalList edit={this.state.edit} editGoal={this.editGoal} editId={this.state.editId} goals={this.state.goals} deleteGoal={this.deleteGoal} addGoal={this.addGoal} editGoalSubmit={this.editGoalSubmit}/>
                        </span>
                        <span style={{ marginLeft: "25px", width: "275px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F2C94C", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Details</h1>
                            <DetailList edit={this.state.edit} address={this.props.address} budget={this.props.budget} googleMaps={this.props.googleMaps}  updateBudget={this.props.updateBudget} updateAddress={this.props.updateAddress} updateGoogleMaps={this.props.updateGoogleMaps}/>
                        </span>
                    </div>
                    <div className="row">

                        <span style={{ width: "600px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F2994A", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Narrative</h1>
                            <Narrative edit={this.state.edit} brief={this.props.brief} narrative={this.props.narrative} updateNarrative={this.props.updateNarrative}/>
                        </span>
                    </div>
                    <div className="row" >

                        <span style={{ width: "600px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Taste Profile</h1>
                            <TasteProfile edit={this.state.edit} brief={this.props.brief}/>
                        </span>
                    </div>
                </div>
            </div>
        );

    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(BriefPageEdit);
