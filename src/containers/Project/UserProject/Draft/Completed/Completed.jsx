// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';
import ArrowLeft from '../../../../../assets/images/icons/ArrowLeft.svg';
import ArrowRight from '../../../../../assets/images/icons/ArrowRight.svg';
import { Link } from 'react-router-dom';
import '../draft.sass'

//Figma Embed import
import FigmaEmbed from 'react-figma-embed';
import ProjectStatus from '../../../../../components/ProjectStatus/ProjectStatus';
import backgroundTemp from '../../../../../Images/TempBackground.PNG';
import { withAuthorization } from '../../../../../utilities/Session/index';
import { Container, Segment, Header, Button, Grid, Message, Form } from 'semantic-ui-react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ReactToolTip from 'react-tooltip'
library.add(faArrowRight);
library.add(faArrowLeft);


class Completed extends Component {
    draft;
    stage;
    constructor(props) {
        super(props);
        this.state = {
            draft: {
                approved: '',
                feedback: '',
                figma: '',
            },
            stage: {
                stage: ''
            },
            tempURL: 'www.google.com',
            figmaTempURL: 'https://www.figma.com/file/ggEHJtusFHITsrjRhvjtJZY5/Bloomtime-Platform-v2?node-id=0%3A1',
            tempYoutube: 'LwZI1isnvPQ',
            showVideo: false,
            loading: false,
            feedbackState: false,
        };
        this.videoToggle = this.videoToggle.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
    }

    handleSuccess(event) {
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
        this.props.formSubmit()
        this.props.handleStateChange()
    }
    

    render() {
        let videoPortion;
        if (this.state.showVideo) {
            videoPortion = <div className="row">
                <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                    <h1 style={{ backgroundColor: "#AAD5F7", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Video Explanation</h1>
                    <YoutubeEmbedVideo videoId={this.props.draft.video} suggestions={false} style={{ width: "600px", padding: "30px" }} />
                </div>
            </div>;
        }
        let feedbackButton;
        if(!this.props.draft.approved) {
            feedbackButton = <Button 
            data-tip='Submit your design feedback'
            content='Submit'
            onClick={this.handleSuccess} 
            color='blue'>
            Submit</Button>
        }else{
            feedbackButton = <Button 
            disabled
            content='Submit' 
            color='blue'>
            Submit</Button>
        }
        return (
            <Grid>
                <Container><ProjectStatus state="draft"/></Container>
                <Container fluid textAlign="center" text='true'>
                    <Link data-tip='go to concept design' to="/project/user_concept" style={{position: "absolute", right: "90%", top: "250px"}}>
                        <img src={ArrowLeft} />
                    </Link>
                    <Grid.Row style={{ paddingTop: '20px' }}>
                    <   Header as='h2'>Rough Draft</Header>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                        <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                            <FigmaEmbed url={this.props.draft.figma} style={{ width: "540px", margin: "30px" }} />
                        </div>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                        <Button.Group>
                            <Button data-tip='Click here to download your design' onClick={this.props.mediaLink}> <ReactToolTip/>Download Design</Button>
                            <Button data-tip='Click here to see your design video' onClick={this.videoToggle}> Show Video</Button>
                        </Button.Group>
                    </Grid.Row>
                    <Grid.Row style={{paddingBottom:'20px'}}>
                        {videoPortion}
                    </Grid.Row>
                    <Grid.Row style={{ paddingBottom: '50px'}} >
                        <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F5BDF9", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Feedback</h1>
                            <Form success className='attached fluid' onSubmit={this.handleNav} style={{maxWidth: "80%", display: "block", margin: "auto", paddingBottom: "20px"}}>
                                <Form.Input  disabled = {this.props.draft.approved && !this.props.feedbackState} fluid name ='feedback' placeholder={this.props.draft.feedback} onChange={this.props.handleChange} type='text'  />
                                <Message 
                                    success
                                    hidden = {!this.props.draft.approved}
                                    header='Feedback Received:' 
                                    content= {this.props.draft.feedback || 'feedback'}/>
                                <Message
                                    success
                                    hidden = {!this.state.feedbackState}
                                    header='Feedback Received:' 
                                    content= {this.props.draft.feedback || 'feedback'}/>
                                {feedbackButton}
                            </Form>
                        </div>
                    </Grid.Row>
                    <Link data-tip='go to final design' to="/project/user_final" style={{position: "absolute", left: "90%", top: "250px"}}>
                        <img src={ArrowRight}/>
                    </Link>
                </Container>
            </Grid>
        );
    }

}

const condition = role => role > 0;

export default withAuthorization(condition)(Completed);
