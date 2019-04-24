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
import BriefWaiting from './Waiting/Waiting';

class BriefPageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }
    }

    render() {
        // const Available = this.props.brief.available;
        const Available = this.props.brief.completed;
        
        if (Available){
            return (
                <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px" }}>
                    <div className="ui stackable grid container">
                        <div className="row" style={{ paddingTop: "40px" }}>
                            <h1>Design Brief</h1>
                            <button type="button" style={{ backgroundColor: "#27AE60", marginLeft: "225px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_BRIEF_EDIT} style={{ textDecoration: 'none', color: "white" }} >Edit</Link></button>
                            <button type="button" style={{ backgroundColor: "#56CCF2", marginLeft: "20px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><a target="_blank" rel="noopener noreferrer" href={this.props.media} style={{ textDecoration: 'none', color: "white" }}>Media</a></button>
                        </div>
                        <div className="row">
                            <span style={{ marginRight: "25px", width: "275px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Goals</h1>
                                <GoalList edit={this.state.edit} goals={this.props.brief.goals}/>
                            </span>
                            <span style={{ marginLeft: "25px", width: "275px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#F2C94C", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Details</h1>
                                <DetailList edit={this.state.edit} budget={this.props.brief.budget} address={this.props.brief.address}/>
                            </span>
                        </div>
                        <div className="row">

                            <span style={{ width: "600px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#F2994A", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Narrative</h1>
                                <Narrative edit={this.state.edit}  narrative={this.props.brief.narrative}/>
                            </span>
                        </div>
                        <div className="row" >

                            <span style={{ width: "600px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Taste Profile</h1>
                                <TasteProfile edit={this.state.edit}/>
                            </span>
                        </div>
                    </div>
                    
                </div>
            );
        }else{
            return (
                <BriefWaiting />
            );
        }

    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(BriefPageView);
