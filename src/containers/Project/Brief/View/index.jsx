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
import BriefWaiting from './Waiting';

class BriefPageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }
    }

    render() {
        // const Available = this.props.brief.available;
        const Available = false;
        
        if (Available){
            return (
                <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px" }}>
                    <div className="ui stackable grid container">
                            <ProjectBanner edit={this.state.edit} brief={this.props.brief}/>

                        <div className="row">
                            <span style={{ marginRight: "25px", width: "275px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Goals</h1>
                                <GoalList edit={this.state.edit} brief={this.props.brief}/>
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
        }else{
            return (
                <BriefWaiting />
            );
        }

    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(BriefPageView);
