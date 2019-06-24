// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


//IMPROT UTILITIES
import { Input, Grid, Header, Item, Button, Container } from 'semantic-ui-react'
import { withAuthorization } from '../../../../../utilities/Session/index';
import * as ROUTES from "../../../../../utilities/constants/routes";

//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
// import { ReactTypeformEmbed } from 'react-typeform-embed';

//Figma Embed import
import FigmaEmbed from 'react-figma-embed';

import backgroundTemp from '../../../../../Images/TempBackground.PNG';

class ConceptPageEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: true,
        }
    }

    render() {
        return (
            <Grid>
                <Container fluid textAlign="center" text='true'>
                    <Grid.Row  style={{ paddingTop: '20px' }}>
                        <Header as='h1'>Final Draft</Header>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '50px', paddingBottom: '20px'}}>
                        <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Design Link</h1>
                            <Item>Link:</Item>
                            <Input style={{ width: "600px"}} type="text" name="figma" onChange={this.props.handleChange} value={this.props.final.figma}/>
                            <FigmaEmbed url={this.props.final.figma} style={{ width: "540px", margin: "30px" }}/>
                        </div>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                        <div style={{ paddingBottom:'6px', backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Media Link</h1>
                            <Input style={{ width: "600px"}} type="text" name="media" onChange={this.props.handleChange} value={this.props.final.media}/>
                        </div>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px', paddingBottom: '50px'}}>
                        <Link to={ROUTES.CLIENT_FINAL} style={{ textDecoration: 'none', color: "white" }}><Button style={{backgroundColor:'#AAD5F7'}} onClick={this.props.completed}>Set Live</Button></Link>
                        <Link to={ROUTES.CLIENT_FINAL} style={{ textDecoration: 'none', color: "white" }}><Button style={{backgroundColor:'#AAD5F7'}} onClick={this.props.formSubmit}>Save</Button></Link>
                    </Grid.Row>
                </Container>
            </Grid>
        );

    }
}

const condition = role => role > 0;

export default withAuthorization(condition)(ConceptPageEdit);
