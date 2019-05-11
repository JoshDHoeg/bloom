import {Link} from "react-router-dom";
import React, { Component } from 'react';
import { Segment, Header, Grid, Button, Container } from 'semantic-ui-react'
import * as ROUTES from "../utilities/constants/routes";
import { withAuthorization } from '../utilities/Session';

//pic, name, loc, status
// const defaultPc = 'https://react.semantic-ui.com/images/avatar/large/molly.png';



class ProjCard extends Component {
    constructor(props) {
        super(props);
    }

    onClick = (projectIndex) => {
        this.props.firebase.activeProject = projectIndex;
        console.log(projectIndex);
    }

    render(){
        return(
        <Grid.Row>
            <Grid.Column>
                <Segment attached='top'>
                    <Grid >
                        <Grid.Row>
                            <Grid.Column width="12">
                                <Header>
                                    {this.props.proj.name}
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
                                    <p>March 3, 2019</p>
                                    <p>420 S High St. Denver CO 80222</p>
                                    <p>$700-1000</p>
                                </Container>
                            </Grid.Column>

                            <Grid.Column width="4">
                                <Link onClick={() => this.onClick(this.props.projectIndex)} to={{ pathname: ROUTES.PROJECT, state: {projectIndex: this.props.projectIndex}}} >
                                    <Button>Project</Button>
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

