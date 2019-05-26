import React, {Component} from 'react'
import {withAuthorization} from '../../utilities/Session'
import logo from '../../Images/TempLogo.JPG';
import { Container, Grid } from 'semantic-ui-react'
import ProjectStatus from '../ProjectStatus/ProjectStatus';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRight);
library.add(faArrowLeft);

class Waiting extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            edit: false,
            title: '',
            src: '',
            message: '',
            link: ''
        }
    }
    
    componentDidMount(){
        if(this.props.state === 'contractors'){
            this.setState({
                title: 'Contractors',
                src: logo,
                message: 'Your contractors havent gotten us their quotes yet. You will receive a notification when they are ready',
                link: '/project/user_revision'
            })
        }
        else if(this.props.state === 'draft'){
            this.setState({
                title: 'Draft',
                src: logo,
                message: 'Your Draft is not ready yet. You will receive a notification when it is ready',
                link: '/project/user_concept'
            })
        }
        else if(this.props.state === 'final'){
            this.setState({
                title: 'Final',
                src: logo,
                message: 'Your Final is not ready yet. You will receive a notification when it is ready',
                link: '/project/user_draft'
            })
        }
        else if(this.props.state === 'revision'){
            this.setState({
                title: 'Revision',
                src: logo,
                message: 'Your Revision is not ready yet. You will receive a notification when it is ready',
                link: '/project/user_final'
            })
        }
        else{
            this.setState({
                title: 'Concept',
                src: logo,
                message: 'Your Concept is not ready yet. You will receive a notification when it is ready',
            })
        }
    }


    render(){
        console.log(this.state.link)
        return(
            <Container>
                <Grid.Row>
                    <ProjectStatus state={this.props.state}/>
                </Grid.Row>
                <Link to={this.state.link} style={{ position: "absolute", right: "90%", top: "250px" }}>
                            <FontAwesomeIcon icon="arrow-left" size="5x" color="black" />
                        </Link>
                <Grid.Row>
                    <Grid.Column style={{textAlign: 'center', paddingBottom: '15px', paddingTop: '15px'}}>
                        <div style={{fontSize:'30px', fontWeight:'bold'}}>{this.state.title}</div>
                    </Grid.Column>
                    <Grid.Column style={{textAlign: 'center',paddingBottom: '15px'}}>
                        <img src={this.state.src}/>
                    </Grid.Column>
                    <Grid.Column style={{textAlign: 'center'}}>
                        <div style={{fontSize:'16px'}}>{this.state.message}</div>
                    </Grid.Column>
                </Grid.Row>
            </Container>
        );
    }

}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Waiting);
