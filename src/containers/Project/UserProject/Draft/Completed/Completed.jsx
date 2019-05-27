import React, { Component } from 'react';
//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';
import ArrowLeft from '../../../../../assets/images/icons/ArrowLeft.svg';
import ArrowRight from '../../../../../assets/images/icons/ArrowRight.svg';

import { Link } from 'react-router-dom';


//Figma Embed import
import FigmaEmbed from 'react-figma-embed';
import ProjectStatus from '../../../../../components/ProjectStatus/ProjectStatus';
import backgroundTemp from '../../../../../Images/TempBackground.PNG';
import { withAuthorization } from '../../../../../utilities/Session/index';
import { Container, Header, Button, Grid, Message, Form } from 'semantic-ui-react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRight);
library.add(faArrowLeft);


class Completed extends Component {
    draft;
    constructor(props) {
        super(props);
        this.state = {
            draft: {
                feedback: ''
            },
            tempURL: 'www.google.com',
            figmaTempURL: 'https://www.figma.com/file/ggEHJtusFHITsrjRhvjtJZY5/Bloomtime-Platform-v2?node-id=0%3A1',
            tempYoutube: 'LwZI1isnvPQ',
            showVideo: false,
            loading: false,
            feedbackState: false,
        };
        this.formSubmit = this.formSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.videoToggle = this.videoToggle.bind(this)
        this.feedbackSuccess = this.feedbackSuccess.bind(this)
    }

    formSubmit = () => {
        this.draft.feedback = this.state.draft.feedback;
        console.log('trying')
        console.log(this.state.draft.feedback)
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            draft: {
                ...this.state.draft,
                [event.target.name]: event.target.value
            }
        });
        console.log(this.state.draft.feedback)
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
        this.draft = await project.draft;
        const state = await {
            loading: false,
            draft: {
                ...this.draft.getAll()
            },
        }
        this.setState(state)
        return state;
    }

    videoToggle(event) {
        this.setState({
            showVideo: !this.state.showVideo
        })
    }
    
    feedbackSuccess (event) {
        this.setState({
            feedbackState: true
        })
    }

    render() {
        let videoPortion;
        console.log("feedback", this.state.feedbackState)
        if (this.state.showVideo) {
            videoPortion = <div className="row">
                <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                    <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Video Explanation</h1>
                    <YoutubeEmbedVideo videoId={this.state.tempYoutube} suggestions={false} style={{ width: "600px", padding: "30px" }} />
                </div>
            </div>;
        }
        let feedbackButton;
        if(!this.state.feedbackState) {
            feedbackButton = <Button 
            onClick={this.feedbackSuccess} 
            content='Submit' color='blue'>
            Submit</Button>
        }else {
            feedbackButton = <Button 
            disabled
            onClick={this.feedbackSuccess} 
            content='Submit' color='blue'>
            Submit</Button>
        }
        return (
            <Grid>
                <Container><ProjectStatus state="draft" å/></Container>
                <Container fluid textAlign="center" text='true'>
                    <Link to="/project/user_concept" style={{position: "absolute", right: "90%", top: "250px"}}>
                        <img src={ArrowLeft} />
                    </Link>
                    <Header as='h2'>Rough Draft</Header>
                    <Grid.Row>
                        <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                            <FigmaEmbed url={this.state.figmaTempURL} style={{ width: "540px", margin: "30px" }} />
                        </div>
                        <Button.Group>
                            <Button>Media</Button>
                            <Button onClick={this.videoToggle}>Show Video</Button>
                        </Button.Group>
                    </Grid.Row>
                    <Grid.Row>
                        {videoPortion}
                    </Grid.Row>
                    <Grid.Row>
                    <Message >
                        <Grid.Row>
                            <Form success className='attached fluid segment' onSubmit={this.formSubmit}>
                                <Form.Input fluid label='Feedback' name ='feedback' value={this.state.draft.feedback} onChange={this.handleChange} type='text'  />
                                <Message 
                                    hidden = {!this.state.feedbackState}
                                    header='Feedback Received' 
                                    content="Our designers will work hard to make the changes you suggested"/>
                                {feedbackButton}
                            </Form>
                        </Grid.Row>
                    </Message>
                    </Grid.Row>
                    <Link to="/project/user_final" style={{position: "absolute", left: "90%", top: "250px"}}>
                        <img src={ArrowRight} />
                    </Link>
                </Container>
            </Grid>
        );
    }

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Completed);
