// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session/index';
import * as ROUTES from "../../../../../utilities/constants/routes";
import { Input, Grid, Header, Item, Button, Container } from 'semantic-ui-react'
import SidebarNav from '../../../../../components/SideBar/Sidebar';
//Figma Embed import
import FigmaEmbed from 'react-figma-embed';

import backgroundTemp from '../../../../../Images/TempBackground.PNG';

class RevisionsPageEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: true,
        }
    }

    onchange(){
        
    }

    render() {
        let link;
        link = '/project/revisions/'+ this.props.currentRevision;
        return (
            <div>
                <SidebarNav handleStateChange={this.props.handleStateChange}/>
            <Grid>
                <Container fluid textAlign="center" text='true'>
                    <Grid.Row style={{ paddingTop: '20px' }}>
                        <Header as='h1'>Revision</Header>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '50px', paddingBottom: '20px'}}>
                        <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Design Link</h1>
                            <Item>Link:</Item>
                            <Input style={{ width: "600px"}} name="figma" type="text" onChange={this.props.handleChange} value={this.props.revision.figma}/>
                            <FigmaEmbed url={this.props.revision.figma} style={{ width: "540px", margin: "30px" }}/>
                        </div>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                    <div style={{ paddingBottom:'6px', backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F5BDF9", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Media Link</h1>
                            <Item>Link:</Item>
                            <Input  style={{ width: "600px"}} name="media" type="text" onChange={this.props.handleChange} value={this.props.revision.media}/>
                    </div>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px', paddingBottom: '50px'}}>
                        <Link to={link} style={{ textDecoration: 'none', color: "white" }}><Button style={{backgroundColor:'#84DB95'}} onClick={this.props.formSubmit}>Save</Button></Link>
                        <Link to={link} style={{ textDecoration: 'none', color: "white" }}><Button style={{backgroundColor:'#FFCE6C'}} onClick={this.props.completed}>Set Live</Button></Link>
                    </Grid.Row>
                </Container>
            </Grid>
            </div>
        );

    }
}

const condition = role => role > 1;

export default withAuthorization(condition)(RevisionsPageEdit);
