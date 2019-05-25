// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../../../utilities/Session/index';
// import * as ROUTES from "../../../utilities/constants/routes";

//Figma Embed import
import FigmaEmbed from 'react-figma-embed';

import backgroundTemp from '../../../../../../Images/TempBackground.PNG';
import {Link} from "react-router-dom";
import * as ROUTES from "../../../../../../utilities/constants/routes";


class DraftPageWaiting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }
    }
    
    render() {
        if(this.props.isDesigner){
            if(!this.props.approved){
                return(
                <div style={{backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                    <div className = "ui stackable grid container">
                        <div className="row">
                        <h1>The Concept has not been approved yet.</h1>
                        </div>
                    </div>
                </div>
                )
            }else{
                console.log(this.props.approved);
                return(
                <div style={{backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                    <div className = "ui stackable grid container">
                        <div className="row">
                        <h1>The Design Draft Is not ready yet. You will receive a notification when it is ready.</h1>
                        <button type="button" style={{ backgroundColor: "#27AE60", marginLeft: "220px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_DRAFT_EDIT} style={{ textDecoration: 'none', color: "white" }} >Edit</Link></button>
                        </div>
                    </div>
                </div>
                );
            }
        }else{
            return (
                <div style={{textAlign: "center" , backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                    <div className="ui stackable grid container">
                        <div className="row">
                            <span style={{ width: "600px" }}>
                                <h1>Your Project Rough Draft Videos are Not Ready Yet...</h1>
                                <h2>Here is an example of a rough draft we sent to another client so you can see what yours might look like.</h2>
                            </span>
                        </div>
                        <div className="row">
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                                <FigmaEmbed url="https://demo.typeform.com/to/njdbt5" style={{ width: "540px", margin: "30px" }}/>
                            </span>
                        </div>
                        <div className="row">
                            <span style={{ width: "600px" }}>
                                <h2>We will reach out to you as soon as the Rough Draft for your house is ready to go!</h2>
                            </span>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(DraftPageWaiting);
