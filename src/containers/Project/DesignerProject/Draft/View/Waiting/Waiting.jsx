// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../../../utilities/Session/index';
// import * as ROUTES from "../../../utilities/constants/routes";

//Figma Embed import
import FigmaEmbed from 'react-figma-embed';
import { Grid, Container, Header, Button } from 'semantic-ui-react';
import backgroundTemp from '../../../../../../Images/TempBackground.PNG';
import {Link} from "react-router-dom";
import * as ROUTES from "../../../../../../utilities/constants/routes";


class DraftPageWaiting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }
    }
    
    render() {
        if(this.props.isDesigner){
            if(!this.props.approved){
                return(
                <Grid style={{paddingBottom:'700px'}}>
                    <Container fluid textAlign='center' text='true'>
                        <Header as='h1'>The Final Concept Has Not Been Approved Yet.</Header>
                    </Container>
                </Grid>
                )
            }else{
                return(
                <Grid style={{paddingBottom:'700px'}}>
                    <Container fluid textAlign='center' text='true'>
                        <Header as='h1'>Select Edit to Begin Working On The Draft.</Header>
                        <Link to={{ pathname: ROUTES.CLIENT_DRAFT_EDIT, state: {projectIndex: this.props.projectIndex}}} style={{ textDecoration: 'none', color: "white" }} ><Button size='large' style={{backgroundColor:'#FFCE6C'}}>Edit</Button></Link>
                    </Container>
                </Grid>
                );
            }
        }else{
            return (
                <div style={{textAlign: "center" , backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                    <div className="ui stackable grid container">
                        <div className="row">
                            <span style={{ width: "600px" }}>
                                <h1>Your Project Rough Draft Videos are Not Ready Yet...</h1>
                                <h2>Here is an example of a rough draft we sent to another client so you can see what yours might look like.</h2>
                            </span>
                        </div>
                        <div className="row">
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                                <FigmaEmbed url="https://demo.typeform.com/to/njdbt5" style={{ width: "540px", margin: "30px" }}/>
                            </span>
                        </div>
                        <div className="row">
                            <span style={{ width: "600px" }}>
                                <h2>We will reach out to you as soon as the Rough Draft for your house is ready to go!</h2>
                            </span>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(DraftPageWaiting);
