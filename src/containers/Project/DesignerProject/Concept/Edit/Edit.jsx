// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Grid, Container, Header, Button, Item } from 'semantic-ui-react';
import YoutubeEmbedVideo from "youtube-embed-video";
//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session/index';
import * as ROUTES from "../../../../../utilities/constants/routes";

import backgroundTemp from '../../../../../Images/TempBackground.PNG';

class ConceptPageEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: true
        }
    }
    render() {
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
                            <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}> Edit Video Link</h1>
                            <Input style={{ width: "600px"}} type="text" name="video" onChange={this.props.handleChange} value={this.props.concept.video}/>
                            <YoutubeEmbedVideo videoId={this.props.concept.video} suggestions={false} style={{ width: "600px", padding: "30px" }} />
                        </div>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px', paddingBottom: '50px'}}>
                        <Link to={ROUTES.CLIENT_CONCEPT} style={{ textDecoration: 'none', color: "white" }}><Button onClick={this.props.completed} style={{backgroundColor:'#FFCE6C'}}>Set Live</Button></Link>
                        <Link to={ROUTES.CLIENT_CONCEPT} style={{ textDecoration: 'none', color: "white" }} ><Button onClick={this.props.formSubmit}>Save</Button></Link>
                    </Grid.Row>
                </Container>
            </Grid>
            // <div style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px" }}>
            //     <div className="ui stackable grid container">
            //         <div className="row" style={{ paddingTop: "40px" }}>
            //             <h1>20% Concept Design</h1>
            //             <button onClick={this.props.completed} type="button"  style={{ backgroundColor: "#27AE60", marginLeft: "122px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_CONCEPT} style={{ textDecoration: 'none', color: "white" }} >Publish</Link></button>
            //             <button onClick={this.props.formSubmit} type="button" style={{ backgroundColor: "#56CCF2", marginLeft: "20px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}><Link to={ROUTES.CLIENT_CONCEPT} style={{ textDecoration: 'none', color: "white" }} >Save</Link></button>
            //         </div>
            //         <div className="row">
            //             <span style={{ width: "600px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
            //                 <h2 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Media Link</h2>
            //                 <Input style={{ width: "600px"}} type="text" name="media" onChange={this.props.handleChange} value={this.props.concept.media}/>   
            //             </span>
            //         </div>
            //         <div className="row">
            //             <span style={{ width: "600px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
            //                 <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Video Explanation</h1>
            //                 <Input style={{ width: "600px"}} type="text" name="video" onChange={this.props.handleChange} value={this.props.concept.video}/>
            //             </span>
            //         </div>
            //         <div className="row">
            //             <span style={{ width: "600px", backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
            //                 <h1 style={{ backgroundColor: "#F2994A", color: "white", textAlign: "center", fontSize: "15px", paddingTop: "10px", paddingBottom: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Feedback</h1>
            //                 <Input style={{ width: "600px"}} type="text" name="feedback" onChange={this.props.handleChange} value={this.props.concept.feedback}/>
            //             </span>
            //         </div>
            //     </div>
            // </div>
        );

    }
}

const condition = role => role > 0;

export default withAuthorization(condition)(ConceptPageEdit);
