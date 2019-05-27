// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session';
import { Container, Header, Button, Icon, Grid, Segment, Form, Message, GridColumn } from 'semantic-ui-react'
import * as ROUTES from "../../../../../utilities/constants/routes";
//Figma Embed import
import FigmaEmbed from 'react-figma-embed';
import { Link } from 'react-router-dom';
import ProjectStatus from '../../../../../components/ProjectStatus/ProjectStatus';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ArrowLeft from '../../../../../assets/images/icons/ArrowLeft.svg';
import ArrowRight from '../../../../../assets/images/icons/ArrowRight.svg';


library.add(faArrowRight);
library.add(faArrowLeft);

class Completed extends React.Component {
    revision;
    constructor(props) {
        super(props);
        this.state = {
            revision: {
                feedback: '',
                approved: '',
                figma: ''
            },
            feedbackState: false,
            loading: false,
            revisions: false,
        }
        this.formSubmit = this.formSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
    }
    
    formSubmit = () => {
        this.revision.feedback = this.state.revision.feedback;
        this.revision.approved = !this.state.revision.approved;

    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            revision: {
                ...this.state.revision,
                [event.target.name]: event.target.value,
            }
        });
    }
    
    handleSuccess() {
        this.setState({
            feedbackState: true
        })
    }

    HandleClick = () => {
        this.setState({
            revisions: true
        });
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
        this.revision = await project.revision
        const state = await {
            loading: false,
            revision: {
                ...this.revision.getAll()
            },
        }
        this.setState(state)
        return state;
    }

    render() {
        console.log('approved', this.state.revision.approved)
        console.log('state', this.state.feedbackState)
        let feedbackButton;
        if(!this.state.revision.approved) {
            feedbackButton = <Button 
            content='Submit'
            onClick={this.handleSuccess} 
            color='blue'>
            Submit</Button>
        }else {
            feedbackButton = <Button 
            disabled
            content='Submit' 
            color='blue'>
            Submit</Button>
        }
        return (
            <Grid>
                <Container><ProjectStatus state="revision"/></Container>
                <Container textAlign='center' text='true'>
                    <Link to="/project/user_final" style={{ position: "absolute", right: "90%", top: "250px" }}>
                        <img src={ArrowLeft} />
                    </Link>
                    <Grid.Row style={{ paddingTop: '20px' }}>
                        <Header as='h2'>Revision</Header>
                    </Grid.Row>
                    <Grid.Row>
                    <p>We listened to your feedback and came up with a new version of your design based on what you said, let us know how we did!</p>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px' }}>
                        <Segment placeholder>
                            <span style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                                <FigmaEmbed url={this.state.revision.figma} style={{ width: "540px", margin: "30px" }} />
                            </span>
                        </Segment>
                    </Grid.Row>
                    <Grid.Row >
                        <Button.Group style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                            <Button>Download Design</Button>
                            <Button onClick={this.HandleClick} >Ask for Revision</Button>
                            <Button ><Link to={ROUTES.CONTRACTORS} style={{ textDecoration: 'none', color: "black" }}>Hire Landscaper</Link></Button>
                        </Button.Group>
                    </Grid.Row>
                    <Grid.Row style={{ paddingBottom: '20px'}}>
                        <Message hidden = {!this.state.revisions}>
                            <Form success className='attached fluid segment' onSubmit={this.formSubmit}>
                                <Form.Input  disabled = {this.state.revision.approved && !this.state.feedbackState} fluid label='Feedback' name ='feedback' placeholder={this.state.revision.feedback} onChange={this.handleChange} type='text'  />
                                <Message 
                                    hidden = {!this.state.revision.approved && !this.state.feedbackState}
                                    header='Feedback Received:' 
                                    content= {this.state.revision.feedback || 'feedback'}/>
                                {feedbackButton}
                            </Form>
                        </Message>
                    </Grid.Row>
                    <Link to="/project/user_contractors" style={{ position: "absolute", left: "90%", top: "250px" }}>
                        <img src={ArrowRight} />
                    </Link>
                </Container>
            </Grid>

        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Completed);
