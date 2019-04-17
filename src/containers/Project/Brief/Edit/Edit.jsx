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
import ProjectBanner from '../../../../components/ProjectBanner/ProjectBanner';

class BriefPageEdit extends Component {
    constructor(props) {
        super(props);
        this.state={
            edit: true,
            list: ['1', '2', '3'],
            goals:[{goal:1, value:""}]
        }

        this.addGoal = this.addGoal.bind(this);
    }

    addGoal = (e) => {
        this.setState((prevState) => ({
          goals: [...prevState.goals, {goal:"", value:""}],
        }));
      }

      handleChange = (e) => {
        if (["goal", "value"].includes(e.target.className) ) {
          let goals = [...this.state.goals]   
          goals[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ goals }, () => console.log(this.state.goals))
        } else {
          this.setState({ [e.target.name]: e.target.value })
        }
        console.log(this.state.goals);
      }

      handleSubmit = (e) => { e.preventDefault() }

    render() {
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
                            <div>

                            {this.state.goals.map((val, idx)=> {
                                let goalId = `goal-${idx}`, valueId = `value-${idx}`
                                return (
                                <div key={idx}>
                                    <label htmlFor={goalId}>{`Goal #${idx + 1}`}</label>
                                    <input
                                    type="text"
                                    name={goalId}
                                    data-id={idx}
                                    id={goalId}
                                    className="name"
                                    onChange={this.handleChange}
                                    />
                                    <label htmlFor={valueId}>Value</label>
                                    <input
                                    type="text"
                                    name={valueId}
                                    data-id={idx}
                                    id={valueId}
                                    className="age"
                                    onChange={this.handleChange}
                                    />
                                </div>
                                )
                            })
                            }
                            </div>
                            <button onClick={this.addGoal}>Add new goal</button>
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
