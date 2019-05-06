// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
=======

>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import * as ROUTES from "../../../../utilities/constants/routes";

//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';

//Figma Embed import
import FigmaEmbed from 'react-figma-embed';

import backgroundTemp from '../../../../Images/TempBackground.PNG';
import Button from '../../../../components/PaymentStripe/frontend/Button'
import FinalWaiting from './Waiting/Waiting';

<<<<<<< HEAD

=======
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
class FinalPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
    }

    render() {
        // const Available = this.props.brief.available;
        const Available = true;
<<<<<<< HEAD

        if (Available){
=======
        
        if (this.props.final.completed){
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
            return (
                <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat',  marginLeft: "-14px", paddingLeft: "14px" }}>
                    <div className="ui stackable grid container" >
                        <div className="row" style={{ paddingTop: "40px" }}>
                            <h1>Rough Draft</h1>
                            <button type="button" style={{ backgroundColor: "#27AE60", marginLeft: "227px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_FINAL_EDIT} style={{ textDecoration: 'none', color: "white" }} >Edit</Link></button>
<<<<<<< HEAD
                            <button type="button" style={{ backgroundColor: "#56CCF2", marginLeft: "20px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><a target="_blank" rel="noopener noreferrer" href={this.props.mediaURL}  style={{ textDecoration: 'none', color: "white" }}>Media</a></button>
=======
                            <button type="button" style={{ backgroundColor: "#56CCF2", marginLeft: "20px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><a target="_blank" rel="noopener noreferrer" href={this.props.final.media}  style={{ textDecoration: 'none', color: "white" }}>Media</a></button>
                        </div>
                        <div className="row" style={{ paddingTop: "5px" }}>
                            <Button/>
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
                        </div>
                        <div className="row">
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
<<<<<<< HEAD
                                <FigmaEmbed url={this.props.figmaURL} style={{ width: "540px", margin: "30px" }}/>
=======
                                <FigmaEmbed url={this.props.final.figma} style={{ width: "540px", margin: "30px" }}/>
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
                            </span>
                        </div>
                        <div className="row">
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Video Explanation</h1>
<<<<<<< HEAD
                                <YoutubeEmbedVideo videoId={this.props.videoId} suggestions={false} style={{ width: "600px", padding: "30px" }} />
=======
                                <YoutubeEmbedVideo videoId={this.props.final.video} suggestions={false} style={{ width: "600px", padding: "30px" }} />
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
                            </span>
                        </div>
                        <div className="row">
                            {/*Typeform being a bitch again*/}
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#F2994A", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Feedback</h1>
<<<<<<< HEAD
                                <ReactTypeformEmbed popup={false} url="https://demo.typeform.com/to/njdbt5" style={{ width: "600px", height: "375px", padding: "30px", paddingTop: "90px" }} />
=======
                                <ReactTypeformEmbed popup={false} url={this.props.final.feedback} style={{ width: "600px", height: "375px", padding: "30px", paddingTop: "90px" }} />
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
                                <YoutubeEmbedVideo suggestions={false} videoId={""} style={{ width: "600px", padding: "30px", visibility: "hidden" }} />
                            </span>
                        </div>
                    </div >
                </div>
            );
        }else{
            return (
                <FinalWaiting />
            );
        }

    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(FinalPageView);