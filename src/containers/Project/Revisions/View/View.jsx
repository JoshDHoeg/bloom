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
import Button from '../../../../components/PaymentStripe/frontend/Button'
import backgroundTemp from '../../../../Images/TempBackground.PNG';

import RevisionsWaiting from './Waiting/Waiting';

class RevisionsPageView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        };

    }
    
     render() {
        // const Available = this.props.brief.available;
        const Available = true;
        if (Available){
            return (
                <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat',  marginLeft: "-14px", paddingLeft: "14px" }}>
                    <div className="ui stackable grid container" >
                    <div className="row" style={{ paddingTop: "40px" }}>
                            <h1>Revisions</h1>
                            <button type="button" style={{ backgroundColor: "#27AE60", marginLeft: "260px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_REVISIONS_EDIT} style={{ textDecoration: 'none', color: "white" }} >Edit</Link></button>
                            <button type="button" style={{ backgroundColor: "#56CCF2", marginLeft: "20px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><a target="_blank" rel="noopener noreferrer" href={this.props.mediaURL} style={{ textDecoration: 'none', color: "white" }}>Media</a></button>
                        </div>
                        <div className='row'>
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <Button SuccessPayment={this.props.SuccessPayment} />
                            </span>
                        </div>
                        <div className="row">
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                                <FigmaEmbed url="https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File" style={{ width: "540px", margin: "30px" }} />
                            </span>
                        </div>
                        <div className="row">
                            {/*Typeform being a bitch again, using a hidden youtube video to keep the span's shape*/}
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#F2994A", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px" , borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Feedback</h1>
                                <ReactTypeformEmbed popup={false} url="https://demo.typeform.com/to/njdbt5" style={{ width: "600px", height: "375px", padding: "30px", paddingTop: "90px" }} />
                                <YoutubeEmbedVideo suggestions={false} videoId={""} style={{ width: "600px", padding: "30px", visibility: "hidden" }} />
                            </span>
                        </div>
                    </div>
                </div>
            );
        }else{
            return (
                <RevisionsWaiting />
            );
        }

    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(RevisionsPageView);