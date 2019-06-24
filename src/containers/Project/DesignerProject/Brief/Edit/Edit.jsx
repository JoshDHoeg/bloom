// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Grid, Container, Header, Button } from 'semantic-ui-react'

//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session/index';
import * as ROUTES from "../../../../../utilities/constants/routes";

import backgroundTemp from '../../../../../Images/TempBackground.PNG';

import GoalList from '../Components/GoalList/GoalList';
import DetailList from '../Components/DetailList/DetailList';
import Narrative from '../Components/Narrative/Narrative';
import TasteProfile from '../Components/TasteProfile/TasteProfile';


class BriefPageEdit extends Component {
    constructor(props) {
        super(props);
        this.state={
            edit: true,
        }

    }

    render() {
        return (
            <Grid>
                <Container fluid textAlign='center' text='true'>
                    <Grid.Row style={{paddingTop:'25px'}}>
                        <Header style={{fontSize:'25px'}}>Design Brief</Header>
                    </Grid.Row>
                    <Grid.Row style={{paddingTop:'50px'}}>
                        <div style={{ paddingBottom:'10px', backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Media Link</h1>
                            <Input name="media" value={this.props.brief.media} onChange={this.props.handleChange}/>
                        </div>
                    </Grid.Row>
                    <Grid style={{ paddingTop: '20px', paddingBottom: '20px'}} columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                    <h1 style={{ backgroundColor: "#F5BDF9", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Goals</h1>
                                    <GoalList edit={this.state.edit} goals={this.props.brief.goals} editGoal={this.props.editGoal} editId={this.props.editId}  deleteGoal={this.props.deleteGoal} addGoal={this.props.addGoal} editGoalSubmit={this.props.editGoalSubmit}/>
                                </div>
                            </Grid.Column>
                            <Grid.Column >
                                <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                    <h1 style={{ backgroundColor: "#F5BDF9", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Details</h1>
                                    <DetailList edit={this.state.edit} address={this.props.brief.address} budget={this.props.brief.budget} handleChange={this.props.handleChange} />
                                </div>  
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                        <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#AAD5F7", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Narrative</h1>
                            <Narrative edit={this.state.edit} brief={this.props.brief} narrative={this.props.brief.narrative} handleChange={this.props.handleChange}/>
                        </div>  
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                        <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#FA907F", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Edit Taste Profile</h1>
                            <TasteProfile edit={this.state.edit} brief={this.props.brief} handleChangeProfile={this.props.handleChangeProfile}/>
                        </div>  
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px', paddingBottom: '50px'}}>
                        <Link to={{ pathname: ROUTES.CLIENT_BRIEF, state: {projectIndex: this.props.projectIndex}}} style={{ textDecoration: 'none', color: "white" }} ><Button onClick={this.props.formSubmit} style={{backgroundColor:'#84DB95'}}>Save</Button></Link>
                        <Link to={{ pathname: ROUTES.CLIENT_BRIEF, state: {projectIndex: this.props.projectIndex}}} style={{ textDecoration: 'none', color: "white" }}><Button style={{backgroundColor:'#FFCE6C'}} onClick={this.props.setLive}>Set Live</Button></Link>
                    </Grid.Row>
                </Container>
            </Grid>
        );

    }
}

const condition = role => role > 0;

export default withAuthorization(condition)(BriefPageEdit);
