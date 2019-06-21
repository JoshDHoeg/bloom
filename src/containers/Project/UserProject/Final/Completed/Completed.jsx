// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session';
import { Container,Segment, Header, Button, Grid, Form, Message } from 'semantic-ui-react'
import * as ROUTES from "../../../../../utilities/constants/routes";
//Figma Embed import
import Editor from '../../../../../components/Wysiwig/wysiwig'
import ProjectStatus from '../../../../../components/ProjectStatus/ProjectStatus';
import FigmaEmbed from 'react-figma-embed';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ArrowLeft from '../../../../../assets/images/icons/ArrowLeft.svg';
import ArrowRight from '../../../../../assets/images/icons/ArrowRight.svg';
import ReactToolTip from 'react-tooltip';
library.add(faArrowRight);
library.add(faArrowLeft);

class Completed extends React.Component {
    final;
    stage;
    constructor(props) {
        super(props);
        this.state = {
            feedbackState: false,
            loading: false,
            revisions: false,
        }
        this.handleSuccess = this.handleSuccess.bind(this);
    }

    handleSuccess() {
        this.setState({
            feedbackState: true
        })
    }

    HandleClick = () => {
        this.setState({
            revisions: !this.state.revisions
        });
    }

    componentDidMount() {
        this.setState({ loading: true })
    }
    
    handleNav = () => {
        this.props.formSubmit()
        this.props.handleStateChange()
    }


    render() {
        let feedbackButton;
        if(!this.props.final.approved) {
            feedbackButton = 
            <Button 
            data-tip='Submit your design feedback'
            content='Submit'
            style={{backgroundColor:'#84DB95'}}
            onClick={this.handleSuccess}
            color='blue'>
            Submit</Button>
        }else {
            feedbackButton = <Button 
            disabled
            style={{backgroundColor:'#84DB95'}}
            content='Submit' 
            color='blue'>
            Submit</Button>
        }
        let RightArrow;
        if(this.props.stage.rcount > 0){
            RightArrow =                     
            <Link data-tip='go to revision' to="/project/user_revision/0" style={{ position: "absolute", left: "90%", top: "250px" }}>
                <img src={ArrowRight} />
                <ReactToolTip />
            </Link>
        }else if(this.props.stage.stage === 'contractors'){
            RightArrow =
            <Link data-tip='go to contractors page' to="/project/user_contractors" style={{ position: "absolute", left: "90%", top: "250px" }}>
                <img src={ArrowRight} />
                <ReactToolTip />
            </Link>
        }
        return (
            <Grid>
                <Container><ProjectStatus state="final" /></Container>
                <Container fluid textAlign='center' text='true'>
                    <Link data-tip='go to rough draft' to="/project/user_draft" style={{ position: "absolute", right: "90%", top: "250px" }}>
                        <img src={ArrowLeft} />
                        <ReactToolTip />
                    </Link>
                    <Grid.Row style={{ paddingTop: '20px' }}>
                        <Header as='h2'>Final Draft</Header>
                    </Grid.Row>
                    <p>
                        Here is a final draft based on the feedback you gave us in the rough draft! Ask for a revision or get started with a landscaper!
                    </p>
                    <Grid.Row style={{ paddingTop: '20px' }}>
                        <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                            <FigmaEmbed url={this.props.final.figma} style={{ width: "540px", margin: "30px" }} />
                        </div>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>                    
                        <Button.Group style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                            <Button style={{backgroundColor:'#84DB95'}} data-tip='Download your design' onClick={this.props.mediaLink}>Download Design</Button>
                            <Button style={{backgroundColor:'#AAD5F7'}} data-tip='Ask for a revision and leave design feedback' onClick={this.HandleClick} >Ask for Revision</Button>
                            <Button style={{backgroundColor:'#84DB95'}}><Link data-tip='Click here to get quotes from landscapers' to={ROUTES.CONTRACTORS} style={{ textDecoration: 'none', color: "black" }}>Hire Landscaper</Link></Button>
                        </Button.Group>
                    </Grid.Row>
                    <Grid.Row style={{ paddingBottom: '50px'}} hidden = {!this.state.revisions}>
                        <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#F5BDF9", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>Feedback</h1>
                            <Form success className='attached fluid' onSubmit={this.handleNav} style={{maxWidth: "80%", display: "block", margin: "auto", paddingBottom: "20px"}}>
                                <Form.Input  disabled = {this.props.final.approved && !this.props.feedbackState} fluid name ='feedback' placeholder={this.props.final.feedback} onChange={this.props.handleChange} type='text'  />
                                <Message 
                                    success
                                    hidden = {!this.props.final.approved}
                                    header='Feedback Received:' 
                                    content= {this.props.final.feedback || 'feedback'}/>
                                <Message
                                    success
                                    hidden = {!this.state.feedbackState}
                                    header='Feedback Received:' 
                                    content= {this.props.final.feedback || 'feedback'}/>
                                {feedbackButton}
                            </Form>
                        </div>
                        <Editor/>
                    </Grid.Row>
                    {RightArrow}
                </Container>
            </Grid>

        )
    }
}

const condition = role => role > 0

export default withAuthorization(condition)(Completed);
