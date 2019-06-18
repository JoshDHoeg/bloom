import React, {Component} from 'react'
import {withAuthorization} from '../../utilities/Session'
import logo from '../../Images/TempLogo.JPG';
import { Container, Grid } from 'semantic-ui-react'
import ProjectStatus from '../ProjectStatus/ProjectStatus';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ArrowLeft from '../../assets/images/icons/ArrowLeft.svg';
import ArrowRight from '../../assets/images/icons/ArrowRight.svg';
import ReactToolTip from 'react-tooltip'

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
            last: '',
            next: ''
        }
    }
    
    componentDidMount(){
        if(this.props.state === 'contractors'){
            this.setState({
                title: 'Contractors',
                src: logo,
                message: 'Your contractors havent gotten us their quotes yet. You will receive a notification when they are ready',
                last: '/project/user_revision',
            })
        }
        else if(this.props.state === 'draft'){
            this.setState({
                title: 'Draft',
                titleNext: 'final',
                titleLast: 'concept design',
                src: logo,
                message: 'Your Draft is not ready yet. You will receive a notification when it is ready',
                last: '/project/user_concept',
                next: '/project/user_final'
            })
        }
        else if(this.props.state === 'final'){
            this.setState({
                title: 'Final',
                titleLast: 'rough draft',
                src: logo,
                message: 'Your Final is not ready yet. You will receive a notification when it is ready',
                last: '/project/user_draft',
                next: '/project/user_revision'
            })
        }
        else if(this.props.state === 'revision'){
            this.setState({
                title: 'Revision',
                src: logo,
                message: 'Your Revision is not ready yet. You will receive a notification when it is ready',
                last: '/project/user_final',
                next: '/project/user_contractors'
            })
        }
        else{
            this.setState({
                title: 'Concept',
                titleNext: 'rough draft',
                src: logo,
                message: 'Your Concept is not ready yet. You will receive a notification when it is ready',
                next: '/project/user_draft'
            })
        }
    }
    render(){
        console.log(this.state.titleNext)
        let Next
        Next = 'go to '+(this.state.titleNext)
        let RightArrow;
        if(this.props.state !== 'final' && this.props.state !=='revision' && this.props.state !== 'contractors'){
            RightArrow =
            <Link data-tip={Next} to={this.state.next} style={{ position: "absolute", left: "90%", top: "250px" }}>
                <ReactToolTip />
                <img src={ArrowRight} />
            </Link>
        }else if(this.props.state === 'final' && this.props.stage.stage === 'revisions'){
            RightArrow = 
            <Link to="/project/user_revision/0" style={{ position: "absolute", left: "90%", top: "250px" }}>
                <img src={ArrowRight} />
            </Link>
    }
        let LeftArrow;
        let Last;
        Last = 'go to '+(this.state.titleLast)
        let revision = Number(this.props.currentRevision)
        console.log(this.props.state)
        if(this.props.state === 'revision' && revision !== 0){
            let revision = Number(this.props.currentRevision)
            let link = "/project/user_revision/"+(revision-1)
            LeftArrow =
            <Link data-tip='go to revision'{...revision-1} to={link} style={{ position: "absolute", right: "90%", top: "250px"}} onClick={this.props.handleStateChange}>
                <ReactToolTip />
                <img src={ArrowLeft} />
            </Link>
        }else if(this.props.state === 'contractors'){
            let revision = Number(this.props.stage.rcount)
            let link = "/project/user_revision/"+(revision);
            LeftArrow =
            <Link to={link} style={{ position: "absolute", right: "90%", top: "250px" }}>
                <img src={ArrowLeft} />
            </Link>
        }else if(this.props.state !== 'concept'){
            LeftArrow =
            <Link data-tip={Last} to={this.state.last} style={{ position: "absolute", right: "90%", top: "250px" }}>
                <img src={ArrowLeft} />
                <ReactToolTip/>
            </Link>
        }
        return(
            <Container>
                {LeftArrow}
                <Grid.Row>
                    <ProjectStatus state={this.props.state} currentRevision={this.props.currentRevision}/>
                </Grid.Row>
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
                {RightArrow}
            </Container>
        );
    }

}
const condition = role => role > 0;

export default withAuthorization(condition)(Waiting);
