// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Container, Header } from 'semantic-ui-react';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session';
import * as ROUTES from "../../../../../utilities/constants/routes";

import backgroundTemp from '../../../../../Images/TempBackground.PNG';

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
                <Grid style={{textAlign: "center" ,backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                    <Container>
                        <Header as='h1'>The Design Brief Is not ready yet. You will receive a notification when it is ready.</Header>
                        <button style={{ backgroundColor: "#27AE60", marginLeft: "225px", width: "100px", height: "40px", borderRadius: "4px", border: "#56CCF2", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.1)" }}type="button" ><Link to={{ pathname: ROUTES.CLIENT_BRIEF_EDIT, state: {projectIndex: this.props.projectIndex}}} style={{ textDecoration: 'none', color: "white" }} >Edit</Link></button>
                    </Container>
                </Grid>
        );
        }else{
            return (
                <div style={{textAlign: "center" ,backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                   <h1>The Brief Is not ready yet. You will receive a notification when it is ready.</h1>
                </div>
            );
        }

    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(BriefPageWaiting);
