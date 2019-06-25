//BLOOMTIME DESIGN 2019

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import Flower from './Flower/flower'
//IMPORT UTILITIES
import {withAuthorization} from '../../utilities/Session';
import * as ROUTES from '../../utilities/constants/routes';
import { Grid, Header, Item, Button, Container, GridColumn } from 'semantic-ui-react';
import image from '../../Images/TempLogo.JPG'

class accessDenied extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Grid>
                <Container fluid textAlign="center" text='true'>
                    <Grid.Row style={{ paddingTop: '20px' }}>
                        <Header as='h1'>These are not the plants you are looking for</Header>
                        <Item>(...but seriously your probably on the wrong page)</Item>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '50px', paddingBottom: '20px'}}>
                        <img src={image}/>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                    <Link to={ROUTES.PROJECT_LIST} style={{ textDecoration: 'none', color: "white" }}><Button style={{backgroundColor:'#84DB95'}}>Go to Project List</Button></Link>
                    </Grid.Row>
                </Container>
            </Grid>
        )
    }
}

export default(accessDenied)