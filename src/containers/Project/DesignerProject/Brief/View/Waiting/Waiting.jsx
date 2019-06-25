// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Container, Header, Button } from 'semantic-ui-react';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../../../utilities/Session/index';
import * as ROUTES from "../../../../../../utilities/constants/routes";
import logo from '../../../../../../Images/TempLogo.JPG';
import backgroundTemp from '../../../../../../Images/TempBackground.PNG';

class BriefPageWaiting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }
    }
    
    render() {
        if(this.props.isDesigner) {
            return (
                <Grid style={{paddingBottom:'700px'}}>
                    <Container fluid textAlign='center' text='true'>
                        <Grid.Row style={{paddingBottom: '15px', paddingTop: '15px'}}>
                            <Header as='h1'>Select Edit to Begin Working On The Brief.</Header>
                        </Grid.Row>
                        <Grid.Row style={{paddingBottom: '15px', paddingTop: '15px'}}>
                            <img src={logo}/>
                        </Grid.Row>
                        <Grid.Row style={{paddingBottom: '15px', paddingTop: '15px'}}>
                            <Link to={{ pathname: ROUTES.CLIENT_BRIEF_EDIT, state: {projectIndex: this.props.projectIndex}}} style={{ textDecoration: 'none', color: "white" }} ><Button size='large' style={{backgroundColor:'#FFCE6C'}}>Edit</Button></Link>
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
                                <h1>Your Project Design Brief is Not Ready Yet...</h1>
                                <h2>But its on its way!!!! Your design brief is gonna summarize your project goals, and expectations</h2>
                                <ul>
                                    <li>Goals</li>
                                    <li>Taste Profile</li>
                                    <li>Narrative</li>
                                    <li>Budget</li>
                                    <li>Photos</li>
                                </ul>
                                <h2>We will reach out to you as soon as the design brief is ready to go!</h2>
                            </span>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

const condition = role => role > 0;

export default withAuthorization(condition)(BriefPageWaiting);
