// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import * as ROUTES from "../../../../utilities/constants/routes";

//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';

//Figma Embed import
import FigmaEmbed from 'react-figma-embed';

import backgroundTemp from '../../../../Images/TempBackground.PNG';
import DraftPageWaiting from './Waiting/Waiting';

class DraftPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
    }

    render() {
        if (this.props.draft.completed){
            return (
                <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat',  marginLeft: "-14px", paddingLeft: "14px" }}>
                    <div className="ui stackable grid container" >
                        <div className="row" style={{ paddingTop: "40px" }}>
                            <h1>Rough Draft</h1>
                            <button type="button" style={{ backgroundColor: "#27AE60", marginLeft: "227px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_DRAFT_EDIT} style={{ textDecoration: 'none', color: "white" }} >Edit</Link></button>
                            <button type="button" style={{ backgroundColor: "#56CCF2", marginLeft: "20px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><a target="_blank" rel="noopener noreferrer" href={this.props.draft.media}  style={{ textDecoration: 'none', color: "white" }}>Media</a></button>
                        </div>
                        <div className="row">
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                                <FigmaEmbed url={this.props.draft.figma} style={{ width: "540px", margin: "30px" }}/>
                            </span>
                        </div>
                        <div className="row">
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Video Explanation</h1>
                                <YoutubeEmbedVideo videoId={this.props.draft.video} suggestions={false} style={{ width: "600px", padding: "30px" }} />
                            </span>
                        </div>
                        <div className="row">
                            {/*Typeform being a bitch again*/}
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#F2994A", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Feedback</h1>
                                <ReactTypeformEmbed popup={false} url={this.props.draft.feedback} style={{ width: "600px", height: "375px", padding: "30px", paddingTop: "90px" }} />
                                <YoutubeEmbedVideo suggestions={false} videoId={""} style={{ width: "600px", padding: "30px", visibility: "hidden" }} />
                            </span>
                        </div>
                        {!this.props.isDesigner && 
                        <div>
                            <button type="button" onClick={this.props.Approved} style={{ backgroundColor: "#27AE60", marginLeft: "260px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}>Approve</button>
                        </div>
                        }
                    </div >
                </div>
            );
        }else{
            return (
                <DraftPageWaiting approved={this.props.concept.approved} isDesigner={this.props.isDesigner}/>
            );
        }

    }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(DraftPageView);