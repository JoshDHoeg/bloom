import {Link} from "react-router-dom";
import React, { Component } from 'react';
import { Segment, Header, Grid, Button, Container } from 'semantic-ui-react'
import * as ROUTES from "../utilities/constants/routes";
import { withAuthorization } from '../utilities/Session';

//pic, name, loc, status
// const defaultPc = 'https://react.semantic-ui.com/images/avatar/large/molly.png';



class ProjCard extends Component {
    stage;
    constructor(props){
        super(props);
        this.state={
            brief:{},
            status: '',
            stage:{
                stage: ''
            }
        }

    }

    onClick = (projectIndex) => {
        this.props.firebase.activeProject = projectIndex;
    }

    async componentDidMount(){
        const brief = await this.props.proj.brief;
        const status = await this.props.proj.status;
        this.setState({brief:brief, status:status});
        this.getProjectState();
    }

    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.stage = await project.stage;
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            stage: {
                stage: this.stage.stage
            }
        }
        this.setState(state);
        return state;
    }


    render(){
        let ProjectButton
        if(this.state.stage.stage === 'revision'){
            ProjectButton = 
            <Link to="/project/user_revision/0" >
                <Button>View Project</Button>
            </Link>
        }else{
            ProjectButton =
            <Link onClick={() => this.onClick(this.props.projectIndex)} to={{ pathname: ROUTES.PROJECT, state: {projectIndex: this.props.projectIndex}}} >
                <Button>View Project</Button>
            </Link>
        }
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
                                {ProjectButton}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Grid.Column>
        </Grid.Row>
        );
    }
    
}


const condition = role => role > 0;

export default withAuthorization(condition)(ProjCard);

