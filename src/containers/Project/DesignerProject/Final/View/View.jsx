// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//IMPORT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session/index';
import * as ROUTES from "../../../../../utilities/constants/routes";
import parse from 'html-react-parser'
//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';
import { Grid, Container, Header, Message, Item, Button } from 'semantic-ui-react'
//Figma Embed import
import FigmaEmbed from 'react-figma-embed';

import backgroundTemp from '../../../../../Images/TempBackground.PNG';
import FinalWaiting from './Waiting/Waiting';


class FinalPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
    }

    render() {
        let feedback
        feedback = parse(this.props.final.feedback);
        if (this.props.final.completed){
            return (
                <Grid>
                    <Container fluid textAlign="center" text='true'>
                        <Grid.Row style={{ paddingTop: '20px' }}>
                            <Header as='h1'>Final Draft</Header>
                        </Grid.Row>
                        <Grid.Row style={{ paddingTop: '50px', paddingBottom: '20px'}}>
                            <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Design</h1>
                                <FigmaEmbed url={this.props.final.figma} style={{ width: "540px", margin: "30px" }}/>
                            </div>
                        </Grid.Row>
                        <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                            <div style={{ paddingBottom:'6px', backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Feedback</h1>
                                <Item>Feedback:</Item>
                                <Message 
                                style={{paddingLeft:'10px', paddingRight: '10px'}}
                                content={feedback} 
                                hidden={!this.props.final.approved}
                                success
                                header="User Feedback Received!"
                                />
                                <Message
                                    style={{paddingLeft:'10px', paddingRight: '10px'}}
                                    content="Your customers feedback will be here once it is provided"
                                    hidden={this.props.final.approved}
                                    success
                                    header="Waiting on feedback"
                                    />
                            </div>
                        </Grid.Row>
                        <Grid.Row style={{ paddingTop: '20px', paddingBottom: '50px'}}>
                            <Link to={ROUTES.CLIENT_FINAL_EDIT} style={{ textDecoration: 'none', color: "white" }} ><Button style={{backgroundColor:'#AAD5F7'}}>Edit</Button></Link>
                            <a target="_blank" rel="noopener noreferrer" href={this.props.final.media}  style={{ textDecoration: 'none', color: "white" }}><Button style={{backgroundColor:'#AAD5F7'}}>Media</Button></a>
                        </Grid.Row>
                    </Container>
                </Grid>
                // <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat',  marginLeft: "-14px", paddingLeft: "14px" }}>
                //     <div className="ui stackable grid container" >
                //         <div className="row" style={{ paddingTop: "40px" }}>
                //             <h1>Final Design</h1>
                //             {this.props.isDesigner &&
                //             <button type="button" style={{
                //                 backgroundColor: "#27AE60",
                //                 marginLeft: "227px",
                //                 width: "100px",
                //                 height: "40px",
                //                 borderRadius: "4px",
                //                 border: "#56CCF2",
                //                 boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)"
                //             }}>
                //                 <Link to={ROUTES.CLIENT_FINAL_EDIT}
                //                      style={{textDecoration: 'none', color: "white"}}>
                //                     Edit
                //                 </Link>
                //             </button>
                //             }
                //             <button type="button" style={{ backgroundColor: "#56CCF2", marginLeft: "20px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><a target="_blank" rel="noopener noreferrer" href={this.props.final.media}  style={{ textDecoration: 'none', color: "white" }}>Media</a></button>
                //         </div>
                //         <div className="row">
                //             <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                //                 <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                //                 <FigmaEmbed url={this.props.figmaURL} style={{ width: "540px", margin: "30px" }}/>
                //             </span>
                //         </div>
                //         <div className="row">
                //             <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                //                 <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Video Explanation</h1>
                //                 <YoutubeEmbedVideo videoId={this.props.videoId} suggestions={false} style={{ width: "600px", padding: "30px" }} />
                //             </span>
                //         </div>
                //         <div className="row">
                //             {/*Typeform being a bitch again*/}
                //             <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                //                 <h1 style={{ backgroundColor: "#F2994A", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Feedback</h1>
                //                 <ReactTypeformEmbed popup={false} url="https://demo.typeform.com/to/njdbt5" style={{ width: "600px", height: "375px", padding: "30px", paddingTop: "90px" }} />
                //                 <YoutubeEmbedVideo suggestions={false} videoId={""} style={{ width: "600px", padding: "30px", visibility: "hidden" }} />
                //             </span>
                //         </div>
                //         {!this.props.isDesigner &&
                //             <div>
                //                 <button type="button" onClick={this.props.Approved} style={{ backgroundColor: "#27AE60", marginLeft: "260px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}>Approve</button>
                //             </div>
                //         }
                //     </div >
                // </div>
            );
        }else{
            return (
                <FinalWaiting approved={this.props.draft.approved} isDesigner={this.props.isDesigner}/>
            );
        }

    }
}


const condition = role => role > 0;

export default withAuthorization(condition)(FinalPageView);
