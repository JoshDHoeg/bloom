// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'semantic-ui-react'

//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import * as ROUTES from "../../../../utilities/constants/routes";

//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';

import backgroundTemp from '../../../../Images/TempBackground.PNG';

class ConceptPageEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: true
        }
    }

    render() {
        console.log(this.props);
        return (
            <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px" }}>
                <div className="ui stackable grid container">
                    <div className="row" style={{ paddingTop: "40px" }}>
                        <h1>20% Concept Design</h1>
                        <button type="button" onClick={this.props.completed} style={{ backgroundColor: "#27AE60", marginLeft: "122px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_CONCEPT} style={{ textDecoration: 'none', color: "white" }} >Publish</Link></button>
                        <button onClick={this.props.formSubmit} type="button" style={{ backgroundColor: "#56CCF2", marginLeft: "20px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_CONCEPT} style={{ textDecoration: 'none', color: "white" }} >Save</Link></button>
                    </div>
                    <div className="row">
                        <span style={{ width: "600px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h2 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Media Link</h2>
                            <Input style={{ width: "600px"}} type="text" name="media" onChange={this.props.handleChange} value={this.props.concept.media}/>   
                        </span>
                    </div>
                    <div className="row">
                        <span style={{ width: "600px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Video Explanation</h1>
                            <Input style={{ width: "600px"}} type="text" name="video" onChange={this.props.handleChange} value={this.props.concept.video}/>
                        </span>
                    </div>
                    <div className="row">
                        <span style={{ width: "600px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F2994A", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Feedback</h1>
                            <Input style={{ width: "600px"}} type="text" name="feedback" onChange={this.props.handleChange} value={this.props.concept.feedback}/>
                        </span>
                    </div>
                </div>
            </div>
        );

    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ConceptPageEdit);
