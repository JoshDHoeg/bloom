// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../../../utilities/Session/index';
// import * as ROUTES from "../../../utilities/constants/routes";
import YoutubeEmbedVideo from "youtube-embed-video";
import logo from '../../../../../../Images/TempLogo.JPG';
import backgroundTemp from '../../../../../../Images/TempBackground.PNG';
import { Grid, Container, Header, Button } from 'semantic-ui-react';
import {Link} from "react-router-dom";
import * as ROUTES from "../../../../../../utilities/constants/routes";


class ConceptPageWaiting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }
    }
    
    render() {
        if(this.props.isDesigner){
            return (
                <Grid style={{paddingBottom:'700px'}}>
                    <Container fluid textAlign='center' text='true'>
                        <Grid.Row style={{paddingBottom: '15px', paddingTop: '15px'}}>
                            <Header as='h1'>Select Edit to Begin Working On The Concept.</Header>
                        </Grid.Row>
                        <Grid.Row style={{paddingBottom: '15px', paddingTop: '15px'}}>
                            <img src={logo}/>
                        </Grid.Row>
                        <Grid.Row style={{paddingBottom: '15px', paddingTop: '15px'}}>
                            <Link to={{ pathname: ROUTES.CLIENT_CONCEPT_EDIT, state: {projectIndex: this.props.projectIndex}}} style={{ textDecoration: 'none', color: "white" }} ><Button size='large' style={{backgroundColor:'#FFCE6C'}}>Edit</Button></Link>
                        </Grid.Row>
                    </Container>
                </Grid>
            );
        }else{
            return (
                <div style={{textAlign: "center" , backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                    <div className="ui stackable grid container">
                        <div className="row">
                            <span style={{ width: "600px" }}>
                                <h1>Your Project Concept Videos are Not Ready Yet...</h1>
                                <h2>But while you are waiting here is an example of a concept video so you know what to expect!!!! </h2>
                            </span>
                        </div>
                        <div className="row">
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Video Explanation</h1>
                                <YoutubeEmbedVideo videoId="V_NYI1O4ooM" suggestions={false} style={{ width: "600px", padding: "30px" }} />
                            </span>
                        </div>
                        <div className="row">
                            <span style={{ width: "600px" }}>
                                <h2>We will reach out to you as soon as the design brief is ready to go!</h2>
                            </span>
                        </div>
                    </div>
                </div>
            );
        }


    }
}

const condition = role => role > 1;

export default withAuthorization(condition)(ConceptPageWaiting);
