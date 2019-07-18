//BLOOMTIME DESIGN 2019

import React from 'react';
import Iframe from 'react-iframe'
import { Link } from 'react-router-dom';
import {Button} from 'semantic-ui-react'
import { Grid, Container, Header, Item } from 'semantic-ui-react';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ArrowRight from '../../../../../assets/images/icons/ArrowRight.svg';
import { library } from '@fortawesome/fontawesome-svg-core';
//IMPORT UTILITIES
import { GoogleDocsViewer } from 'react-google-docs-viewer'
import { withAuthorization } from '../../../../../utilities/Session';
import { GroupedObservable } from 'rxjs';
library.add(faArrowRight);
library.add(faArrowLeft);





class Approve extends React.Component{
    concept;
    constructor(props) {
        super(props);
        this.state = {
            complete: false
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
    }

    render(){
        if(!this.props.complete){
            return (
                <div>
                    <Grid style={{ textAlign:"center", paddingTop:'8%'}}>
                        <Grid.Row style={{paddingLeft:'20%', paddingRight:'20%'}}>
                        <div style={{ backgroundColor: "#F5F2D0", border: '1px solid grey', borderRadius: "16px", padding:'10px' }}>
                            <Grid.Row style={{padding:'10px'}}>
                                <Header as='h2'>
                                    Terms of Service
                                </Header>
                            </Grid.Row>
                            <Grid.Row style={{padding:'10px'}}>
                                <Item>
                                    Please accept our terms of service to continue with your project
                                </Item>
                            </Grid.Row>
                            <Grid.Row>
                            <div >
                            <Iframe url= 'https://docs.google.com/document/d/15cNEZwPDqRgPgZ_w8VAd4izfueILrGH3eGS_FQ0wZ1Y'
                                width="900px"
                                height="700px"
                                id="myId"
                                className="myClassname"
                                display="initial"
                                position="relative"
                                frameBorder='0px'/>
                            </div>
                            </Grid.Row>
                            <Grid.Row style={{padding:'10px'}}>
                                <Button style={{backgroundColor:'#84DB95'}} onClick={this.props.handleClick1}>I AGREE</Button>
                            </Grid.Row>
                        </div>
                        </Grid.Row>
                    </Grid>
                </div>
            )
        }else if(this.props.complete){
            return(
                <div>
                    <Grid style={{textAlign: "center", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                        <Container>
                            <br/>
                            <br/>
                            <Header as='h1'>Terms of service</Header>
                            <Button disabled onClick={this.props.handleClick1}>Thank you!</Button>
                            <Link to="/project/user_concept/payment" style={{position: "absolute", left: "90%", top: "250px"}}>
                            <img src={ArrowRight}/></Link>
                        </Container>
                    </Grid>
                </div>
            )        
        }
    }
}

<<<<<<< HEAD
const condition = role => role > 0 && role !== 2;
=======
const condition = role => role > 0 && role !==2;
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
export default withAuthorization(condition)(Approve);
