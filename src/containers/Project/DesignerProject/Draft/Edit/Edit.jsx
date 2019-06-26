// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Grid, Header, Item, Button, Container } from 'semantic-ui-react'

//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session/index';
import * as ROUTES from "../../../../../utilities/constants/routes";

//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
// import { ReactTypeformEmbed } from 'react-typeform-embed';

//Figma Embed import
import FigmaEmbed from 'react-figma-embed';
import SidebarNav from '../../../../../components/SideBar/Sidebar';
import backgroundTemp from '../../../../../Images/TempBackground.PNG';

class DraftPageEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: true,
        }
    }

    render() {
        return (
            <div>
                <SidebarNav/>
            <Grid>
                <Container fluid textAlign="center" text='true'>
                    <Grid.Row style={{ paddingTop: '20px' }}>
                        <Header as='h1'>Rough Draft</Header>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '50px', paddingBottom: '20px'}}>
                        <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Design Link</h1>
                            <Item>Link:</Item>
                            <Input style={{ width: "600px"}} type="text" name="figma" onChange={this.props.handleChange} value={this.props.draft.figma}/>
                            <FigmaEmbed url={this.props.draft.figma} style={{ width: "540px", margin: "30px" }}/>
                        </div>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                        <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F5BDF9", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Video Explanation Link</h1>
                            <Input style={{ width: "600px"}} type="text" name="video" onChange={this.props.handleChange} value={this.props.draft.video}/>
                            <YoutubeEmbedVideo videoId={this.props.draft.video} suggestions={false} style={{ width: "600px", padding: "30px" }} />
                        </div>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                        <div style={{ paddingBottom:'6px', backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#AAD5F7", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Media Link</h1>
                            <Input style={{ width: "600px"}} type="text" name="media" onChange={this.props.handleChange} value={this.props.draft.media}/>
                        </div>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px', paddingBottom: '50px'}}>
                        <Link to={ROUTES.CLIENT_DRAFT} style={{ textDecoration: 'none', color: "white" }}><Button style={{backgroundColor:'#84DB95'}} onClick={this.props.formSubmit}>Save</Button></Link>
                        <Link to={ROUTES.CLIENT_DRAFT} style={{ textDecoration: 'none', color: "white" }}><Button style={{backgroundColor:'#FFCE6C'}} onClick={this.props.completed}>Set Live</Button></Link>
                    </Grid.Row>
                </Container>
            </Grid>
            </div>
        );

    }
}

const condition = role => role > 1;

export default withAuthorization(condition)(DraftPageEdit);
