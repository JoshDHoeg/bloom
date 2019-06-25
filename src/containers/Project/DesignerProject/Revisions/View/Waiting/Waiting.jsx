// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Container, Header, Button } from 'semantic-ui-react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../../../utilities/Session';
import * as ROUTES from "../../../../../../utilities/constants/routes";
import logo from '../../../../../../Images/TempLogo.JPG';
import backgroundTemp from '../../../../../../Images/TempBackground.PNG';

// import EditButton from '../../../../../../components/ProjectBanner/EditButton/EditButton';


class RevisionsPageWaiting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }
    }

    render() {
        if(this.props.isDesigner){
            if(!this.props.final.approved){
                return (
                <Grid style={{paddingBottom:'700px'}}>
                    <Container fluid textAlign='center' text='true'>
                        <Grid.Row style={{paddingBottom: '15px', paddingTop: '15px'}}>
                            <Header as='h1'>The Final Draft Has Not Been Approved Yet.</Header>
                        </Grid.Row>
                        <Grid.Row style={{paddingBottom: '15px', paddingTop: '15px'}}>
                            <img src={logo}/>
                        </Grid.Row>
                    </Container>
                </Grid>
                )
            }else{
                return (
                <Grid style={{paddingBottom:'700px'}}>
                    <Container fluid textAlign='center' text='true'>
                        <Grid.Row style={{paddingBottom: '15px', paddingTop: '15px'}}>
                            <Header as='h1'>Select Edit to Begin Working On The Revision.</Header>
                        </Grid.Row>
                        <Grid.Row style={{paddingBottom: '15px', paddingTop: '15px'}}>
                            <img src={logo} />
                        </Grid.Row>
                        <Grid.Row style={{paddingBottom: '15px', paddingTop: '15px'}}>
                            <Link to={{ pathname: ROUTES.CLIENT_REVISIONS_EDIT, state: {projectIndex: this.props.projectIndex}}} style={{ textDecoration: 'none', color: "white" }} ><Button size='large' style={{backgroundColor:'#FFCE6C'}}>Edit</Button></Link>
                        </Grid.Row>
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
                                <h1>Your Revisions are not done yet</h1>
                                <h2>We are always going to try to do everything we can to make sure you get something that is perfect. So</h2>
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

export default withAuthorization(condition)(RevisionsPageWaiting);
