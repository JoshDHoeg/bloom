// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import SidebarNav from '../../../../../../components/SideBar/Sidebar';
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
            if(!this.props.brief.approved){
                return(
                    <div>
                    <SidebarNav/>
                <Grid style={{paddingBottom:'700px'}}>
                    <Container fluid textAlign='center' text='true'>
                        <Grid.Row style={{paddingBottom: '15px', paddingTop: '15px'}}>
                            <Header as='h1'>The Concept Has Not Been Approved Yet.</Header>
                        </Grid.Row>
                        <Grid.Row style={{paddingBottom: '15px', paddingTop: '15px'}}>
                            <img src={logo}/>
                        </Grid.Row>
                    </Container>
                </Grid>
                </div>
                );
            }else{
                return (
                    <div>
                        <SidebarNav/>
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
                    </div>
                );
            }
        }


    }
}

const condition = role => role > 1;

export default withAuthorization(condition)(ConceptPageWaiting);
