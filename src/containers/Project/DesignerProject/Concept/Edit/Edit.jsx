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
                        <Link to={ROUTES.CLIENT_CONCEPT} style={{ textDecoration: 'none', color: "white" }} ><Button style={{backgroundColor:'#84DB95'}} onClick={this.props.formSubmit}>Save</Button></Link>
                        <Link to={ROUTES.CLIENT_CONCEPT} style={{ textDecoration: 'none', color: "white" }}><Button onClick={this.props.completed} style={{backgroundColor:'#FFCE6C'}}>Set Live</Button></Link>
                    </Grid.Row>
                </Container>
            </Grid>
        
        );

    }
}

const condition = role => role > 1;

export default withAuthorization(condition)(ConceptPageEdit);
