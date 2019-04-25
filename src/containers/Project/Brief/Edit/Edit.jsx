// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'semantic-ui-react'

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
        }

    }

    render() {
        console.log(this.props);
        return (
            <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px" }}>
                <div className="ui stackable grid container">
                    <div className="row" style={{ paddingTop: "40px" }}>
                        <h1>Design Brief</h1>
                        <button onClick={this.props.setLive} type="button" style={{ backgroundColor: "#27AE60", marginLeft: "225px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_BRIEF} style={{ textDecoration: 'none', color: "white" }} >Publish</Link></button>
                        <button onClick={this.props.formSubmit} type="button" style={{ backgroundColor: "#56CCF2", marginLeft: "20px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_BRIEF} style={{ textDecoration: 'none', color: "white" }} >Save</Link></button>
                    </div>
                    <div className="row">
                        <span style={{ width: "600px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h2 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Media Link</h2>
                            <Input name="media" value={this.props.brief.media} onChange={this.props.handleChange}/>
                        </span>
                    </div>
                    <div className="row">
                        <span style={{ marginRight: "25px", width: "275px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Goals</h1>
                            <GoalList edit={this.state.edit} goals={this.props.brief.goals} editGoal={this.props.editGoal} editId={this.props.editId}  deleteGoal={this.props.deleteGoal} addGoal={this.props.addGoal} editGoalSubmit={this.props.editGoalSubmit}/>
                        </span>
                        <span style={{ marginLeft: "25px", width: "275px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F2C94C", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Details</h1>
                            <DetailList edit={this.state.edit} address={this.props.brief.address} budget={this.props.brief.budget} handleChange={this.props.handleChange} />
                        </span>
                    </div>
                    <div className="row">

                        <span style={{ width: "600px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F2994A", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Narrative</h1>
                            <Narrative edit={this.state.edit} brief={this.props.brief} narrative={this.props.brief.narrative} handleChange={this.props.handleChange}/>
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
