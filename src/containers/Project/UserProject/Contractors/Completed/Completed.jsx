import React, { Component } from 'react'
import { Grid, Divider, Segment, Button, Header, Container } from 'semantic-ui-react';
import { withAuthorization } from '../../../../../utilities/Session';
import ProjectStatus from '../../../../../components/ProjectStatus/ProjectStatus';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRight);
library.add(faArrowLeft);


class Completed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWaiting: true
        }
    }
    render() {
        return (
            <div>
                <Container><ProjectStatus state="contractors" /></Container>
                <Grid style={{ textAlign: "center", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>

                    <Container fluid textAlign='center' text='true'>
                        <Link to="/project/user_revision" style={{ position: "absolute", right: "90%", top: "250px" }}>
                            <FontAwesomeIcon icon="arrow-left" size="5x" color="black" />
                        </Link>

                        <Grid.Column width={3} />
                        <Grid.Column width={9}>
                            <Header>Hey we found three quotes for you!</Header>
                            {this.props.quotes.map(quote =>
                                <Segment>
                                    <Grid columns={2} stackable textAlign='center'>
                                        <Grid.Row >
                                            <Grid.Column>
                                                <Header>{quote.name}</Header>
                                                <div>{quote.stars}</div>
                                            </Grid.Column>

                                            <Grid.Column>
                                                <div>{quote.price}</div>
                                                <Button primary>Contact</Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Segment>
                            )}
                        </Grid.Column>
                    </Container>
                </Grid>
            </div>
        );
    }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Completed)
