// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import ArrowLeft from '../../../../../assets/images/icons/ArrowLeft.svg';
import ArrowRight from '../../../../../assets/images/icons/ArrowRight.svg';
import { Link } from 'react-router-dom';
import '../draft.sass'
import introJs from 'intro.js';
import 'intro.js/introjs.css';
//Figma Embed import
<<<<<<< HEAD
=======
import logo from '../../../../../Images/TempLogo.JPG'
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
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
        if(!this.props.user.tour2){
            introJs().start();
            this.props.tour2();
        }
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
<<<<<<< HEAD
            <Grid columns = 'two' style={{ height: "120vh", position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#84DB95", margin: '2px' }}>
                <Grid.Row>
                <Container><ProjectStatus state="draft" /></Container>
                </Grid.Row>
                <Grid.Row style={{ position: 'absolute', top: '10%' }}>
                <Grid.Column style={{ position: 'relative', paddingLeft: '9%', width: '50%', paddingRight: '5px' }}>
                    <div style={{backgroundColor: "#FFFFFF", boxShadow: '0px 0px 6px 1px rgba(0,0,0,0.1)', borderRadius: "4px", paddingBottom:'10px' }}>
                        <h1 style={{ backgroundColor: '#AAD5F7', color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                        <FigmaEmbed url={this.props.draft.figma} style={{ display: 'block', width: "96%", marginLeft: '10px', marginRight:'10px', border: '1px solid grey', borderRadius: "4px"}} />
                        <Grid.Row style={{paddingTop: '5px', textAlign: "center"}}>
                            <Button style={{ backgroundColor:'#AAD5F7'}} data-tip='Click here to download your design' onClick={this.props.mediaLink}>Download Design</Button>
                        </Grid.Row>
                    </div>
                </Grid.Column>
            
                <Grid.Column style={{ position: 'relative', paddingRight: '9%', paddingLeft: '5px', width: '50%' }}>                    
                    <Grid.Row>
                        <div>
                            <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#AAD5F7", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Video Explanation</h1>
                                <YoutubeEmbedVideo videoId={this.props.draft.video} suggestions={false} style={{ width: "100%", padding: "20px" }} />
                            </div>
                        </div>
                    </Grid.Row>
                    <Grid.Row style={{ padding: "10px"}}>
                    <Editor style={{paddingLeft: '0px'}}
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
                <Link data-tip='go to final design' to="/project/user_final" style={{position: "absolute", left: "90%", top: "250px"}}>
                    <img src={ArrowRight}/>
                    <ReactToolTip />
                </Link>
            
=======
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
                            <Grid.Row data-intro="You can view your design below, use the 'download your design' button to download you design."style={{paddingBottom:'50px'}}>
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
                                <Grid.Row data-intro="Your designer has also included a video for further explanation, which you can view below." style={{textAlign:'center', paddingTop:'10px'}}>
                                    <Header as='h3'>Rough Draft Video</Header>
                                    <Item>View the video content your designer has prepared for you</Item>
                                </Grid.Row>
                                <YoutubeEmbedVideo videoId={this.props.draft.video} suggestions={false} style={{ width: "100%", padding: "20px" }} />
                            </Segment>
                        </Grid.Row> 
                        <Grid.Row style={{ paddingLeft: "12px", paddingRight:'12px' }}>
                        <Editor
                            data='Once you have had a chance to consider your design, leave feedback here for your designer to implement in your next design'
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
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
            </Grid>

            // <Grid className='Draft'>
            //     <Container><ProjectStatus state="draft"/></Container>
            //     <Container fluid textAlign="center" text='true'>
            //         {LeftArrow}
            //         <Grid.Row className='Header' style={{ paddingTop: '20px' }}>
            //             <Header as='h2'>Rough Draft</Header>
            //         </Grid.Row>
            //         <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>
            //             <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
            //                 <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
            //                 <FigmaEmbed url={this.props.draft.figma} style={{ width: "540px", margin: "30px" }} />
            //             </div>
            //         </Grid.Row>
            //         <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>
            //             <Button.Group>
            //                 <Button style={{backgroundColor:'#AAD5F7'}} data-tip='Click here to download your design' onClick={this.props.mediaLink}> <ReactToolTip/>Download Design</Button>
            //                 <Button style={{backgroundColor:'#FFCE6C'}} data-tip='Click here to see your design video' onClick={this.videoToggle}> Show Video</Button>
            //             </Button.Group>
            //         </Grid.Row>
            //         <Grid.Row style={{paddingBottom:'20px'}}>
            //             {videoPortion}
            //         </Grid.Row>
            //         <Grid.Row style={{ paddingBottom: '50px'}} >
            //             <Editor 
            //             state='draft' 
            //             approved={this.props.draft.approved} 
            //             feedback={this.props.draft.feedback} 
            //             feedbackButton={feedbackButton} 
            //             handleChange={this.props.handleChange} 
            //             feedbackState={this.state.feedbackState} 
            //             handleNav={this.handleNav} /> 
            //         </Grid.Row>
            //         <Link data-tip='go to final design' to="/project/user_final" style={{position: "absolute", left: "90%", top: "250px"}}>
            //             <img src={ArrowRight}/>
            //         </Link>
            //     </Container>
            // </Grid>
        );
    }

}

const condition = role => role > 0 && role !== 2;

export default withAuthorization(condition)(Completed);
