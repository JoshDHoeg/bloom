import {Link} from "react-router-dom";
import React, { Component } from 'react';
import { Segment, Header, Grid, Button, Container, Item } from 'semantic-ui-react'
import * as ROUTES from "../utilities/constants/routes";
import { withAuthorization } from '../utilities/Session';

//pic, name, loc, status
// const defaultPc = 'https://react.semantic-ui.com/images/avatar/large/molly.png';



class ProjCard extends Component {
    stage;
    brief;
    user;
    constructor(props){
        super(props);
        this.state={
            brief: {
                address: ''
            },
            status: '',
            stage:{
                stage: ''
            },
            user: {
                isDesigner: false
            }
        }

    }

    onClick = (projectIndex) => {
        this.props.firebase.activeProject = projectIndex;
    }

    async componentDidMount(){
        //const brief = await this.props.proj.brief;
        //this.setState({brief:brief, status:status});
        this.getUserState();
        const brief = await this.props.proj.brief;
        const status = await this.props.proj.status;
        console.log(this.props.proj);
        this.setState({brief:brief, status:status});
    }

    getUserState = async () => {
        const user = await this.props.firebase.doGetUser(this.props.firebase.user.uid);
        this.user = await user
        const state = await {
            loading: false,
            user: {
                isDesigner: this.user.isDesigner
            },
        }
        this.setState(state);
        if(!this.state.user.isDesigner){
            this.getProjectState();
        }
        return state;
    }

    getProjectState = async () => {
        const project = await this.props.firebase.doGetProjects(this.props.firebase.user.uid);
        this.stage = await project.stage;
        this.brief = await project.brief;
        console.log(project)
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            stage: {
                stage: this.stage.stage
            },
            brief:{
                ...this.brief.getAll()
            }
        }
        this.setState(state);
        return state;
    }


    render(){
        if(!this.state.user.isDesigner){
            let ProjectButton
            if(this.state.stage.stage === 'revision'){
                ProjectButton = 
                <Link to="/project/user_revision/0" >
                    <Button style={{backgroundColor:'#84DB95'}}>View Project</Button>
                </Link>
            }else{
                ProjectButton =
                <Link onClick={() => this.onClick(this.props.projectIndex)} to={{ pathname: ROUTES.PROJECT, state: {projectIndex: this.props.projectIndex}}} >
                    <Button style={{backgroundColor:'#84DB95'}}>View Project</Button>
                </Link>
            }
            return(
                <Grid>
                    <Container>
                        <Grid.Column style={{paddingBottom:'50px'}}>
                            <Segment.Group style={{display:'block', margin:'auto', width:350,}} raised compact>
                                <Segment attached='top'>
                                    <Grid floated='center' width={2}>
                                        <Container textAlign='center'>
                                            <Grid.Row>
                                                <Grid.Column >
                                                    <Header style={{fontSize: '18px', paddingTop:'10px', paddingBottom:'10px'}}>
                                                        Address: {this.state.brief.address}
                                                    </Header>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Container>
                                    </Grid>
                                </Segment>
                                <Segment  attached>
                                    <Grid>
                                        <Container textAlign= 'center'>
                                            <Grid.Row>
                                                <Grid.Column width={5}>
                                                    <Header style={{paddingTop:'10px'}}>
                                                        In Progress
                                                    </Header>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column  width={5}>
                                                        <Item style={{fontSize: '18px', paddingTop:'10px', paddingBottom:'10px'}}> Stage: {this.state.stage.stage}</Item>
                                                </Grid.Column>
                                                <Grid.Column  width={5}>
                                                        <Item style={{fontSize: '18px', paddingTop:'10px', paddingBottom:'20px'}}> Budget: {this.state.brief.budget}</Item>
                                                </Grid.Column>
                                                <Grid.Column  style={{paddingBottom:'15px'}} width={4}>
                                                    {ProjectButton}
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Container>
                                    </Grid>
                                </Segment>
                            </Segment.Group>
                        </Grid.Column>
                    </Container>
                </Grid>
            );
        }else{
            return(
                <Grid.Row>
                    <Grid.Column>
                        <Segment attached='top'>
                            <Grid >
                                <Grid.Row>
                                    <Grid.Column width="12">
                                        <Header>
                                            {this.state.brief.address}
                                        </Header>
                                    </Grid.Column>
        
                                    <Grid.Column width="4">
                                        <Header>
                                            In Progress
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                        <Segment attached>
                            <Grid >
                                <Grid.Row>
                                    <Grid.Column width="12">
                                        <Container>
                                            <p>{this.state.brief.budget}</p>
                                        </Container>
                                    </Grid.Column>
        
                                    <Grid.Column width="4">
                                        <Link onClick={() => this.onClick(this.props.projectIndex)} to={{ pathname: ROUTES.PROJECT, state: {projectIndex: this.props.projectIndex}}} >
                                            <Button>View Project</Button>
                                        </Link>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            )
        }
    }
    
}


const condition = role => role > 0;

export default withAuthorization(condition)(ProjCard);

