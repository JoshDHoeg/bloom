// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session/index';
import * as ROUTES from "../../../../../utilities/constants/routes";
import { Grid, Container, Header, Button, Message} from 'semantic-ui-react'
//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';

import backgroundTemp from '../../../../../Images/TempBackground.PNG';

import ConceptWaiting from './Waiting/Waiting';

class ConceptPageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }
    }

    render() {
        // const Available = this.props.brief.available;
        console.log('video', this.props.concept.video)
        if (this.props.concept.completed){
            return (
                <Grid>
                    <Container fluid textAlign='center' text='true'>
                        <Grid.Row style={{paddingTop:'25px'}}>
                            <Header as='h1'>Concept Design</Header>
                        </Grid.Row>
                        <Grid.Row style={{paddingTop:'50px', paddingBottom:'20px'}}>
                            <Header as='h3'>Upload a video of your concepts for the user to choose from</Header>
                        </Grid.Row>
                        <Grid.Row style={{paddingBottom:'20px'}}>
                        <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Video</h1>
                            <YoutubeEmbedVideo videoId={this.props.concept.video} suggestions={false} style={{ width: "600px", padding: "30px" }} />
                        </div>
                        </Grid.Row>
                        <Grid.Row style={{ paddingTop: '20px', paddingBottom: '50px'}}>
                        <Link to={ROUTES.CLIENT_CONCEPT_EDIT}
                        style={{textDecoration: 'none', color: "white"}}>
                            <Button style={{backgroundColor:'#FFCE6C'}}>
                                Edit
                            </Button>
                        </Link>
                        </Grid.Row>
                    </Container>
                </Grid>
                // <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px" }}>
                //     <div className="ui stackable grid container">
                //         <div className="row" style={{ paddingTop: "40px" }}>
                //             <h1>20% Concept Design</h1>
                //             {this.props.isDesigner &&
                //                 <button type="button" style={{
                //                     backgroundColor: "#27AE60",
                //                     marginLeft: "122px",
                //                     width: "100px",
                //                     height: "40px",
                //                     borderRadius: "4px",
                //                     border: "#56CCF2",
                //                     boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)"
                //                 }}
                //                 >
                //                     <Link to={ROUTES.CLIENT_CONCEPT_EDIT}
                //                          style={{textDecoration: 'none', color: "white"}}>
                //                         Edit
                //                     </Link>
                //                 </button>
                //             }
                //             <button type="button" style={{ backgroundColor: "#56CCF2", marginLeft: "20px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><a target="_blank" rel="noopener noreferrer" href={this.props.media} style={{ textDecoration: 'none', color: "white" }}>Media</a></button>

                //             </div>
                //         <div className="row">
                //             <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                //                 <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Video Explanation</h1>
                //                 <YoutubeEmbedVideo videoId={this.props.concept.video} suggestions={false} style={{ width: "600px", padding: "30px" }} />
                //             </span>
                //         </div>
                //         <div className="row">
                //             {/*Typeform being a bitch again*/}
                //             <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                //                 <h1 style={{ backgroundColor: "#F2994A", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Feedback</h1>
                //                 <ReactTypeformEmbed popup={false} url={this.props.concept.feedback} style={{ width: "600px", height: "375px", padding: "30px", paddingTop: "90px" }} />
                //                 <YoutubeEmbedVideo suggestions={false} videoId={""} style={{ width: "600px", padding: "30px", visibility: "hidden" }} />
                //             </span>
                //         </div>
                //     </div>
                // </div>
            );
        }else{
            return (
                <ConceptWaiting isDesigner={this.props.isDesigner}/>
            );
        }

    }
}

const condition = role => role > 0;

export default withAuthorization(condition)(ConceptPageView);
