// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import ArrowLeft from '../../../../../assets/images/icons/ArrowLeft.svg';
import ArrowRight from '../../../../../assets/images/icons/ArrowRight.svg';
import { Link } from 'react-router-dom';
import '../draft.sass'

//Figma Embed import
import logo from '../../../../../Images/TempLogo.JPG'
import Editor from '../../../../../components/Wysiwig/wysiwig'
import FigmaEmbed from 'react-figma-embed';
import ProjectStatus from '../../../../../components/ProjectStatus/ProjectStatus';
import { withAuthorization } from '../../../../../utilities/Session/index';
import { Container, Header, Button, Grid, Sticky, Item, Segment, Image } from 'semantic-ui-react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ReactToolTip from 'react-tooltip'
import { maxHeight } from '@material-ui/system';
library.add(faArrowRight);
library.add(faArrowLeft);


class Completed extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.videoToggle = this.videoToggle.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
    }

    handleSuccess() {
       this.setState({
           feedbackState: true
       })
    }

    componentDidMount() {
        this.setState({ loading: true })
    }

    videoToggle(event) {
        this.setState({
            showVideo: !this.state.showVideo
        })
    }

    handleNav = () => {
        this.props.formSubmit();
        this.props.handleStateChange();
    }
    

    render() {
        let feedbackButton;
        if(!this.props.draft.approved) {
            feedbackButton = <Button 
            style={{backgroundColor:'#FA907F'}}
            data-tip='Submit your design feedback'
            content='Submit'
            onClick={this.handleSuccess}>
            Submit</Button>
        }else{
            feedbackButton = <Button 
            disabled
            style={{backgroundColor:'#FA907F'}}
            content='Submit'>
            Submit</Button>
        }
        let LeftArrow
        if(this.props.concept.completed && this.props.concept.approved && this.props.concept.approveterms && !this.props.concept.isPaid && (this.props.stage.stage === 'draft' || this.props.stage.stage === 'concept')){
            LeftArrow =
            <Link data-tip='go to payment' to="/user_payment" style={{ position: "absolute", right: "90%", top: "250px" }}>
            <img src={ArrowLeft} />
            </Link>
        }else{
            LeftArrow =
            <Link data-tip='go to concept design' to="/project/user_concept" style={{ position: "absolute", right: "90%", top: "250px" }}>
            <img src={ArrowLeft} />
            </Link>
        }
        let message;
        if(!this.props.concept.isPaid && (this.props.stage.stage === 'draft' || this.props.stage.stage === 'concept')){
            message=
                'Your Draft has been completed and you can check it out here! Please leave feedback at the bottom of this page so we can start working on your Final Design. Pay on the page to the left to get you Final Design.';
        }else if(!this.props.concept.isPaid && this.props.stage.stage === 'final' && this.props.draft.feedback){
            message=
                'Your Draft has been completed and you can check it out here! Pay on the page to the right get you Final Design.';
        }else if(this.props.concept.isPaid && (this.props.stage.stage === 'draft' || this.props.stage.stage === 'concept')){
            message=
                'Your Draft has been completed and you can check it out here! Check to see if your final is ready on the next page.';
        }else if(this.props.concept.isPaid && (this.props.stage.stage === 'final' || this.props.stage.stage === 'revision'|| this.props.stage.stage === 'contractors')){
            message = 
                'Your Draft has been completed and you can check it out here! Check to see if your final is ready on the next page.';
        }
        return (
            <Grid columns='two' style={{paddingBottom:'50px'}}>
                <ProjectStatus state="draft" />
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
                    <Grid.Column style={{ position: 'relative', paddingLeft: '9%', width: '50%', paddingRight: '10px' }}>
                        <Segment raised style={{borderBottom:'5px solid #FA907F'}}>
                            <Grid.Row style={{paddingBottom:'50px'}}>
                                <Header floated='left' style={{ marginTop:'0px' }} as='h3'>Rough Draft</Header>
                                <Button floated='right' style={{ backgroundColor:'#FA907F', marginTop:'0px' }} data-tip='Download your design' onClick={this.props.mediaLink}>Download Your Design</Button>
                            </Grid.Row>
                            <Item style={{ textAlign:'center', paddingBottom:'10px' }}> Here is a rough draft based on the feedback you gave us in the concepts! Ask for a revision or get started with a landscaper!</Item>
                            <FigmaEmbed url={this.props.draft.figma} style={{ display:'block', width:'100%', border: '1px solid grey', borderRadius: "8px" }} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column style={{ position: 'relative', paddingRight: '9%', paddingLeft: '6px', width: '50%' }}>               
                        <Grid.Row style={{paddingBottom:'16px'}}>
                            <Segment raised style={{borderBottom:'5px solid #FA907F'}}>
                                <Grid.Row style={{textAlign:'center', paddingTop:'10px'}}>
                                    <Header as='h3'>Rough Draft Video</Header>
                                    <Item>View the video content your designer has prepared for you</Item>
                                </Grid.Row>
                                <YoutubeEmbedVideo videoId={this.props.draft.video} suggestions={false} style={{ width: "100%", padding: "20px" }} />
                            </Segment>
                        </Grid.Row> 
                        <Grid.Row style={{ paddingLeft: "12px", paddingRight:'12px' }}>
                        <Editor
                            state='draft'
                            Show={this.state.show}
                            approved={this.props.draft.approved}
                            feedback={this.props.draft.feedback}
                            feedbackButton={feedbackButton}
                            handleChange={this.props.handleChange}
                            feedbackState={this.state.feedbackState}
                            handleNav={this.handleNav} />
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
                {LeftArrow}
                <Link data-tip='go to final design' to="/project/user_final" style={{ position: "absolute", left: "90%", top: "250px" }}>
                    <img src={ArrowRight}/>
                    <ReactToolTip />
                </Link>
            </Grid>
        );
    }

}

const condition = role => role > 0;

export default withAuthorization(condition)(Completed);
