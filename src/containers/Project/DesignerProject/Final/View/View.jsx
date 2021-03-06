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
import SidebarNav from '../../../../../components/SideBar/Sidebar';
//Figma Embed import
import FigmaEmbed from 'react-figma-embed';
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
                <div>
<<<<<<< HEAD
                    <SidebarNav/>
=======
                <SidebarNav/>
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
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
                                <h1 style={{ backgroundColor: "#F5BDF9", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Feedback</h1>
                                <Grid.Row>
                                    <Item>Feedback:</Item>
                                </Grid.Row>
                                <Grid.Row style={{paddingLeft:'6px', paddingRight:'6px'}}>
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
                                </Grid.Row>
                            </div>
                        </Grid.Row>
                        <Grid.Row style={{ paddingTop: '20px', paddingBottom: '50px'}}>
                            <Link to={ROUTES.CLIENT_FINAL_EDIT} style={{ textDecoration: 'none', color: "white" }} ><Button style={{backgroundColor:'#FFCE6C'}}>Edit</Button></Link>
                            <a target="_blank" rel="noopener noreferrer" href={this.props.final.media}  style={{ textDecoration: 'none', color: "white" }}><Button style={{backgroundColor:'#84DB95'}}>Media</Button></a>
                        </Grid.Row>
                    </Container>
                </Grid>
                </div>
            );
        }else{
            return (
                <FinalWaiting approved={this.props.draft.approved} isDesigner={this.props.isDesigner}/>
            );
        }

    }
}


const condition = role => role > 1;

export default withAuthorization(condition)(FinalPageView);
