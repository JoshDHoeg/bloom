import {Link} from "react-router-dom";
import React, { Component } from 'react';
import { Segment, Header, Grid, Button, Container } from 'semantic-ui-react'
import * as ROUTES from "../utilities/constants/routes";
import { withAuthorization } from '../utilities/Session';

//pic, name, loc, status
// const defaultPc = 'https://react.semantic-ui.com/images/avatar/large/molly.png';



class ProjCard extends Component {

    constructor(props){
        super(props);
        this.state={
            brief:{}
        }
    }

    onClick = (projectIndex) => {
        this.props.firebase.activeProject = projectIndex;
        console.log(projectIndex);
    }

    async componentDidMount(){
        const brief = await this.props.proj.brief;
        this.setState({brief:brief});
    }

    render(){
        console.log(this.state)
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
                                    Rough Draft
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
        );
    }
    
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProjCard);

