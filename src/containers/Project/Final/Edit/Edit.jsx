// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
=======
import { Input } from 'semantic-ui-react'
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c

//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import * as ROUTES from "../../../../utilities/constants/routes";

//Youtube video and typeform imports
<<<<<<< HEAD
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';
=======
// import YoutubeEmbedVideo from "youtube-embed-video";
// import { ReactTypeformEmbed } from 'react-typeform-embed';
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c

//Figma Embed import
// import FigmaEmbed from 'react-figma-embed';

import backgroundTemp from '../../../../Images/TempBackground.PNG';

class ConceptPageEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: true,
        }
    }

    render() {
        return (
            <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat',  marginLeft: "-14px", paddingLeft: "14px" }}>
                <div className="ui stackable grid container" >
                <div className="row" style={{ paddingTop: "40px" }}>
                        <h1>Rough Draft</h1>
<<<<<<< HEAD
                        <button type="button" style={{ backgroundColor: "#27AE60", marginLeft: "227px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_FINAL} style={{ textDecoration: 'none', color: "white" }} >Done</Link></button>
                        <button type="button" style={{ backgroundColor: "#56CCF2", marginLeft: "20pX", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><a target="_blank" rel="noopener noreferrer" href="https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing" style={{ textDecoration: 'none', color: "white" }}>Media</a></button>
=======
                        <button onClick={this.props.completed} type="button" style={{ backgroundColor: "#27AE60", marginLeft: "227px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_FINAL} style={{ textDecoration: 'none', color: "white" }} >Publish</Link></button>
                        <button onClick={this.props.formSubmit} type="button" style={{ backgroundColor: "#56CCF2", marginLeft: "20pX", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_FINAL} style={{ textDecoration: 'none', color: "white" }} >Save</Link></button>
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
                    </div>
                    <div className="row">
                        <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h2 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Media Link</h2>
<<<<<<< HEAD
                            <input type="text" onChange={this.props.updateMedia} value={this.props.mediaURL}/>   
=======
                            <Input style={{ width: "600px"}} type="text" name="media" onChange={this.props.handleChange} value={this.props.final.media}/>   
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
                        </span>
                    </div>
                    <div className="row">
                        <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
<<<<<<< HEAD
                            <input type="text" onChange={this.props.updateFigma} value={this.props.figmaURL}/>   
=======
                            <Input style={{ width: "600px"}} type="text" name="figma" onChange={this.props.handleChange} value={this.props.final.figma}/>   
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
                        </span>
                    </div>
                    <div className="row">
                        <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Video Explanation</h1>
<<<<<<< HEAD
                            <input type="text" onChange={this.props.updateVideo} value={this.props.videoId}/>   
=======
                            <Input style={{ width: "600px"}} type="text" name="video" onChange={this.props.handleChange} value={this.props.final.video}/>   
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
                        </span>
                    </div>
                    <div className="row">
                        {/*Typeform being a bitch again*/}
                        <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F2994A", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Feedback</h1>
<<<<<<< HEAD
                            <ReactTypeformEmbed popup={false} url="https://demo.typeform.com/to/njdbt5" style={{ width: "600px", height: "375px", padding: "30px", paddingTop: "90px" }} />
                            <YoutubeEmbedVideo suggestions={false} videoId={""} style={{ width: "600px", padding: "30px", visibility: "hidden" }} />
=======
                            <Input style={{ width: "600px"}} type="text" name="feedback" onChange={this.props.handleChange} value={this.props.final.feedback}/>
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
                        </span>
                    </div>
                </div >
            </div>
        );

    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ConceptPageEdit);
