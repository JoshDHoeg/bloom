//BLOOMTIME DESIGN 2019

import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'semantic-ui-react'
import { Grid, Container, Header } from 'semantic-ui-react';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ArrowRight from '../../../../../assets/images/icons/ArrowRight.svg';
import { library } from '@fortawesome/fontawesome-svg-core';
//IMPORT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session';
library.add(faArrowRight);
library.add(faArrowLeft);





class Approve extends React.Component{
    concept;
    constructor(props) {
        super(props);
        this.state = {
            concept: {
                approveterms: false
            },
            complete: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.concept.approveterms = true;
        this.state.concept.approveterms = true;
        this.setState({complete: true})
    }

    componentDidMount() {
        this.setState({ loading: true })
        if(this.props.location.state){
            this.setState({projectIndex: this.props.location.state.projectIndex});
            this.getProjectState(this.props.location.state.projectIndex);
        }else{
            this.setState({projectIndex: 0});
            this.getProjectState(0)
        }
    }
    
    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.concept = await project.concept;
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            concept: {
                ...this.concept.getAll()
            }
        }

        this.setState(state);
        return state;
    }



    render(){
        console.log(this.state.complete)
        if(!this.state.complete){
            return (
                <div>
                    <Grid style={{textAlign: "center", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                        <Container>
                            <br/>
                            <br/>
                            <Header as='h1'>Terms of service</Header>
                            <Button onClick={this.handleClick}>Accept Terms of Service</Button>
                        </Container>
                    </Grid>
                </div>
            )
        }else if(this.state.complete){
            return(
                <div>
                    <Grid style={{textAlign: "center", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                        <Container>
                            <br/>
                            <br/>
                            <Header as='h1'>Terms of service</Header>
                            <Button disabled onClick={this.handleClick}>Thank you!</Button>
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
