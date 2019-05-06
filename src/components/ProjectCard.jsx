import {Link} from "react-router-dom";
import React from 'react';
import { Segment, Header, Grid, Button, Container } from 'semantic-ui-react'
import * as ROUTES from "../utilities/constants/routes";

//pic, name, loc, status
// const defaultPc = 'https://react.semantic-ui.com/images/avatar/large/molly.png';
const ProjCard = ({props})  => (
    <Grid.Row>
        <Grid.Column>
            <Segment attached='top'>
                <Grid >
                    <Grid.Row>
                        <Grid.Column width="12">
                            <Header>
                                {props.name}
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
                            <Link to={ROUTES.PROJECT}>
                                <Button>Project</Button>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Grid.Column>
    </Grid.Row>
);

export default ProjCard;
