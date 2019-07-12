// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session';
import { Container, Header, Button, Grid, Segment, Item, Divider, Image } from 'semantic-ui-react'
import * as ROUTES from "../../../../../utilities/constants/routes";
//Figma Embed import
import logo from '../../../../../Images/TempLogo.JPG'
import Editor from '../../../../../components/Wysiwig/wysiwig'
import FigmaEmbed from 'react-figma-embed';
import { Link } from 'react-router-dom';
import ProjectStatus from '../../../../../components/ProjectStatus/ProjectStatus';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ArrowLeft from '../../../../../assets/images/icons/ArrowLeft.svg';
import ArrowRight from '../../../../../assets/images/icons/ArrowRight.svg';
import ReactToolTip from 'react-tooltip';


library.add(faArrowRight);
library.add(faArrowLeft);

class Completed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackState: false,
            loading: false,
            Show: false,
        }
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleNav = this.handleNav.bind(this);
    }
    
    handleSuccess() {
        this.setState({
            feedbackState: true,
        })
    }

    handleNav = () => {
        this.props.formSubmit()
        this.props.handleStateChange()
    }

    HandleClick = () => {
        this.setState({
            Show: !this.state.Show
        });
    }

    handleRedirect = () => {
        this.props.history.push(ROUTES.CONTRACTORS);
        this.stage.stage = 'contractors'
    }


    componentDidMount() {
        this.setState({ loading: true })
    }

    render() {
        let feedbackButton;
        if(!this.props.revision.approved) {
            feedbackButton = <Button 
            data-tip='Submit your revision feedback'
            content='Submit'
            style={{ backgroundColor:'#F5BDF9' }}
            onClick={this.handleSuccess}>
            Request A Revision</Button>
        }else{
            feedbackButton = <Button 
            disabled
            style={{ backgroundColor:'#F5BDF9' }}
            content='Submit'>
            Request A Revision</Button>
        }
        let RightArrow;
        if(this.props.currentRevision < (this.props.stage.rcount-1)){
            let revision = Number(this.props.currentRevision)
            let link = "/project/user_revision/"+(revision + 1);
            RightArrow =                     
            <Link data-tip='go to next revision' to={link} style={{ position: "absolute", left: "90%", top: "250px" }} onClick={this.props.handleStateChange}>
                <img src={ArrowRight} />
                <ReactToolTip/>
            </Link>
        }else if(this.props.stage.stage === 'contractors') {
            RightArrow =                     
            <Link data-tip='go to contractor page' to="/project/user_contractors" style={{ position: "absolute", left: "90%", top: "250px" }}>
                <img src={ArrowRight} />
                <ReactToolTip/>
            </Link>
        }
        let LeftArrow;
        let revision = Number(this.props.currentRevision)
        if(revision > 0){
            let revision = Number(this.props.currentRevision)
            let link = "/project/user_revision/"+(revision-1)
            LeftArrow =
            <Link data-tip='go to last revision' to={link} style={{ position: "absolute", right: "90%", top: "250px" }} onClick={this.props.handleStateChange}>
                <img src={ArrowLeft} />
                <ReactToolTip/>
            </Link>
        }else{
            LeftArrow =
            <Link data-tip='go to final design' to="/project/user_final" style={{ position: "absolute", right: "90%", top: "250px" }}>
                <img src={ArrowLeft} />
                <ReactToolTip/>
            </Link>
        }
        let message;
        if(!this.props.revision.approved){
            message =
            'Your Revision has been completed and you can check it out here! Leave feedback to receive a revision';
        }else{
            message=
            'We will work hard to use your feedback while making your revision. When your revision is ready you can find it on the page to the right.';
        }
        return (
            <Grid columns='two' style={{paddingBottom:'50px'}}>
                <ProjectStatus state="revision" currentRevision={this.props.currentRevision}/>
                <Grid.Row style={{marginTop:'6%', paddingBottom:'5%'}}>
                    <Grid.Column style={{ position: 'relative', paddingLeft: '9%', width: '50%', paddingRight: '10px'}}>
                        <Header as='h2'>
                            Welcome {this.props.user.name}!
                        </Header>
                        <Item style={{fontSize:'16px'}}>
                            {message}
                        </Item>
                    </Grid.Column>
                    <Grid.Column style={{ position: 'relative', paddingRight: '9%', paddingLeft: '6px', width: '50%'}}>
                            <Image floated='right' src={logo} alt='blootime-logo'/> 
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ padding:'0px'}}>
                    <Grid.Column style={{ position:'relative', paddingLeft:'9%', paddingRight: '10px', width: '50%' }}>
                        <Segment raised style={{borderBottom:'5px solid #F5BDF9'}}>
                        <Grid.Row style={{paddingBottom:'50px'}}>
                            <Header floated='left' style={{ marginTop:'0px' }} as='h2'>Revision</Header>
                            <Button floated='right' style={{ backgroundColor:'#F5BDF9', marginTop:'0px' }} data-tip='Download your design' onClick={this.props.mediaLink}>Download Your Design</Button>
                        </Grid.Row>
                        <Item style={{ textAlign:'center', paddingBottom:'10px' }}> Here is a final draft based on the feedback you gave us in the rough draft! Ask for a revision or get started with a landscaper!</Item>
                        <FigmaEmbed url={this.props.revision.figma} style={{ display:'block', width:'100%', border: '1px solid grey', borderRadius: "8px" }} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column style={{ position:'relative', paddingRight:'9%', paddingLeft: '6px', width:'50%' }}>
                        <Grid.Row style={{ paddingLeft: "15px", paddingRight:'15px', paddingBottom:'16px' }}>
                            <Editor
                                state='revision'
                                approved={this.props.revision.approved}
                                feedback={this.props.revision.feedback}
                                handleNav={this.props.handleNav}
                                feedbackButton={feedbackButton}
                                handleChange={this.props.handleChange}
                                feedbackState={this.state.feedbackState}
                                handleNav={this.handleNav} />
                        </Grid.Row>
                        <Grid.Row> 
                            <div>
                                <Segment raised style={{borderBottom:'5px solid #F5BDF9'}}>
                                    <Header as='h3' style={{ textAlign:'center', paddingTop:'10px' }}>Do It Yourself or Get Some Help</Header>
                                    <Grid.Row style={{ textAlign:'center', paddingBottom:'10px' }}>
                                    <Item>Let us help you get started or get quotes from trusted contractors</Item>
                                    </Grid.Row>
                                    <Grid.Row style={{ display:'flex', justifyContent:'center' }}>
                                        <Button floated='left' style={{ backgroundColor:'#F5BDF9' }} data-tip='Click here to go to our blog ' onClick={this.props.blogLink} >Get Help</Button>
                                        <Divider horizontal>Or</Divider>
                                        <Button floated='right' style={{ backgroundColor:'#F5BDF9' }} data-tip='Click here to get quotes from landscapers' onClick={this.props.handleRedirect} >Hire Landscaper</Button>
                                    </Grid.Row>
                                </Segment>
                            </div>
                        </Grid.Row> 
                    </Grid.Column>
                </Grid.Row>
                {LeftArrow}
                {RightArrow}
            </Grid>
        )
    }
}

const condition = role => role > 0;

export default withAuthorization(condition)(Completed);
