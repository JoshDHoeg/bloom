//BLOOMTIME DESIGN 2019

import React from 'react';
import Iframe from 'react-iframe'
import { Link } from 'react-router-dom';
import {Button} from 'semantic-ui-react'
import { Grid, Container, Header } from 'semantic-ui-react';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ArrowRight from '../../../../../assets/images/icons/ArrowRight.svg';
import { library } from '@fortawesome/fontawesome-svg-core';
//IMPORT UTILITIES
import { GoogleDocsViewer } from 'react-google-docs-viewer'
import { withAuthorization } from '../../../../../utilities/Session';
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
                    <Grid style={{textAlign: "center", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                        <Container>
                            <br/>
                            <br/>
                            <Header as='h1'>Terms of service</Header>
                            <div>
                            <Iframe url= 'https://docs.google.com/document/d/15cNEZwPDqRgPgZ_w8VAd4izfueILrGH3eGS_FQ0wZ1Y'
                                width="700px"
                                height="800px"
                                id="myId"
                                className="myClassname"
                                display="initial"
                                position="relative"/>
                            </div>
                            <Button onClick={this.props.handleClick1}>I AGREE</Button>
                        </Container>
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

const condition = role => role > 0;
export default withAuthorization(condition)(Approve);
