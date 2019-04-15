// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
// import * as ROUTES from "../../../utilities/constants/routes";

import backgroundTemp from '../../../../Images/TempBackground.PNG';

import GoalList from './../Components/GoalList';
import DetailList from './../Components/DetailList';
import Narrative from './../Components/Narrative';
import TasteProfile from './../Components/TasteProfile';
import ProjectBanner from '../../../../components/ProjectBanner';

class BriefPageEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: true,
            goals:[]
        }

        this.onUpdateGoals = this.onUpdateGoals.bind(this);
    }

    handleChange(event) {
        console.log(event);
        console.log("somehting was updated");
        console.log(this.props.brief.goals);
        console.log(this.props.brief.goals[event.target.id]);
        // let tempBrief = Object.assign({}, this.state.brief);
        // console.log(tempBrief);
        // tempBrief.goals[event.target.id] = event.target.value;
        // this.setState({brief: tempBrief});
        // this.setState({...this.state.goals, goals[event.target.id]: event.target.value});
    }

    onUpdateGoals = (event) => {
        this.setState(state => {
          const goals = state.goals.map(item => item = event.target.value);
            
          return {
            goals,
          };
        });
      };

    componentDidMount() {
        this.setState({ 
            loading: true, 
            goals: this.props.brief.goals 
        });
        console.log("fuck");
        console.log(this.props.brief.goals);
      }

    render() {
        return (
            <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px" }}>
                <div className="ui stackable grid container">
                        <ProjectBanner edit={this.state.edit} brief={this.props.brief} updateBrief={this.props.updateBrief}/>

                    <div className="row">
                        <span style={{ marginRight: "25px", width: "275px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Goals</h1>
                            <div id='GoalsEdit' style={{ listStyleType: 'none', paddingBottom: "15px" }}>
                                {this.props.brief.goals.map((g, i) => (
                                    <li key={i}>
                                        <input type="text" id={`${i}`} value={g} onChange={this.onUpdateGoals}/>
                                    </li>
                                ))}
                            </div>
                        </span>
                        <span style={{ marginLeft: "25px", width: "275px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F2C94C", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Details</h1>
                            <DetailList edit={this.state.edit} brief={this.props.brief}/>
                        </span>
                    </div>
                    <div className="row">

                        <span style={{ width: "600px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F2994A", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Narrative</h1>
                            <Narrative edit={this.state.edit} brief={this.props.brief}/>
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
