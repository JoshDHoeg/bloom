// BLOOMTIME DESIGN 2019
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
import { Container, Segment, Header, Button, Grid, Message, Form } from 'semantic-ui-react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
    

    render() {
        let videoPortion;
        if (this.state.showVideo) {
            videoPortion = <div className="row">
                <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                    <h1 style={{ backgroundColor: "#2F80ED", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Video Explanation</h1>
                    <YoutubeEmbedVideo videoId={this.props.draft.video} suggestions={false} style={{ width: "600px", padding: "30px" }} />
                </div>
            </div>;
        }
        let feedbackButton;
        if(!this.props.draft.approved) {
            feedbackButton = <Button 
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
                <Container><ProjectStatus state="draft" å/></Container>
                <Container fluid textAlign="center" text='true'>
                    <Link to="/project/user_concept" style={{position: "absolute", right: "90%", top: "250px"}}>
                        <img src={ArrowLeft} />
                    </Link>
                    <Grid.Row style={{ paddingTop: '20px' }}>
                    <   Header as='h2'>Rough Draft</Header>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                        <Segment placeholder>
                            <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                                <FigmaEmbed url={this.props.draft.figma} style={{ width: "540px", margin: "30px" }} />
                            </div>
                        </Segment>
                        <Button.Group>
                            <Button>Media</Button>
                            <Button onClick={this.videoToggle}>Show Video</Button>
                        </Button.Group>
                    </Grid.Row>
                    <Grid.Row style={{paddingBottom:'20px'}}>
                        {videoPortion}
                    </Grid.Row>
                    <Grid.Row style={{ paddingBottom: '20px'}} >
                        <Form success className='attached fluid segment' onSubmit={this.props.formSubmit}>
                            <Form.Input  disabled = {this.props.draft.approved && !this.props.feedbackState} fluid label='Feedback' name ='feedback' placeholder={this.props.draft.feedback} onChange={this.props.handleChange} type='text'  />
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
                    </Grid.Row>
                    <Link to="/project/user_final" style={{position: "absolute", left: "90%", top: "250px"}}>
                        <img src={ArrowRight} />
                    </Link>
                </Container>
            </Grid>
        );
    }

}

const condition = role => role > 0;

export default withAuthorization(condition)(Completed);
