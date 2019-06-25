// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session/index';
import * as ROUTES from "../../../../../utilities/constants/routes";
import {Grid, Container, Button, Header, Segment, Sidebar, GridColumn} from 'semantic-ui-react'
// import backgroundTemp from '../../../../../Images/TempBackground.PNG';
import SidebarNav from '../../../../../components/SideBar/Sidebar'
import GoalList from '../Components/GoalList/GoalList';
import DetailList from '../Components/DetailList/DetailList';
import Narrative from '../Components/Narrative/Narrative';
import TasteProfile from '../Components/TasteProfile/TasteProfile';
import BriefWaiting from './Waiting/Waiting';

class BriefPageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }
    }
    render() {
        const Available = this.props.brief.completed;
        if (Available){
            return (
                <Grid>
                    <Grid.Row style={{paddingTop:'-25px'}}>
                    <Segment><SidebarNav/></Segment>
                    </Grid.Row>
                    {/* </Grid.Column> */}
                    {/* <Grid.Column style={{display:'block', margin:'auto', width:700}}> */}
                    <Container fluid textAlign='center' text='true'>
                        <Grid.Row style={{paddingTop:'25px'}}>
                            <Header style={{fontSize:'25px'}}>Design Brief</Header>
                        </Grid.Row>
                        <Grid style={{paddingTop:'50px'}} columns={2}>
                            <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                                <Grid.Column>
                                    <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                        <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Goals</h1>
                                        <GoalList edit={this.state.edit} goals={this.props.brief.goals}/>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                        <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Detail List</h1>
                                        <DetailList edit={this.state.edit} budget={this.props.brief.budget} address={this.props.brief.address}/>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                            <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#F5BDF9", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Narrative</h1>
                                <Narrative edit={this.state.edit}  narrative={this.props.brief.narrative}/>
                            </div>
                        </Grid.Row>
                        <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                            <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#AAD5F7", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Taste Profile</h1>
                                <TasteProfile edit={this.state.edit} brief={this.props.brief}/>
                            </div>
                        </Grid.Row>
                        <Grid.Row style={{ paddingTop: '20px', paddingBottom: '50px'}}>
                            <Link to={{ pathname: ROUTES.CLIENT_BRIEF_EDIT,
                                        state: {projectIndex: this.props.projectIndex}}}          
                                        style={{textDecoration: 'none', color: "white"}}>
                                        <Button style={{backgroundColor:'#FFCE6C'}}>Edit</Button>
                            </Link>
                            <a target="_blank" rel="noopener noreferrer" href={this.props.brief.media}  style={{ textDecoration: 'none', color: "white" }}><Button style={{backgroundColor:'#84DB95'}}>Media</Button></a>
                        </Grid.Row>
                    </Container>
                    {/* </Grid.Column> */}
                </Grid>
            );
        }else{
            return (
                <BriefWaiting
                isDesigner={this.props.firebase.user._isDesigner}
                />
            );
        }

    }
}

const condition = role => role > 1;

export default withAuthorization(condition)(BriefPageView);
