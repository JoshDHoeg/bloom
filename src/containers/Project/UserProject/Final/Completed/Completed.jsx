// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session';
import { Container, Header, Button, Grid, Form, Message } from 'semantic-ui-react'
import * as ROUTES from "../../../../../utilities/constants/routes";
//Figma Embed import
import ProjectStatus from '../../../../../components/ProjectStatus/ProjectStatus';
import FigmaEmbed from 'react-figma-embed';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ArrowLeft from '../../../../../assets/images/icons/ArrowLeft.svg';
import ArrowRight from '../../../../../assets/images/icons/ArrowRight.svg';
library.add(faArrowRight);
library.add(faArrowLeft);

class Completed extends React.Component {
    final;
    constructor(props) {
        super(props);
        this.state = {
            final: {
                feedback: '',
                approved: ''
            },
            feedbackState: false,
            loading: false,
            revision: false,
        }
        this.formSubmit = this.formSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
    }

    formSubmit = () => {
        this.final.feedback = this.state.final.feedback;
        this.final.approved = !this.state.final.approved;

    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            final: {
                ...this.state.final,
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
            revision: true
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
        this.final = await project.final
        const state = await {
            loading: false,
            final: {
                ...this.final.getAll()
            },
        }
        this.setState(state)
        return state;
    }

    render() {
        let feedbackButton;
        if(!this.state.final.approved) {
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
                <Container><ProjectStatus state="final" /></Container>
                <Container fluid textAlign='center' text='true'>
                    <Link to="/project/user_draft" style={{ position: "absolute", right: "90%", top: "250px" }}>
                        <img src={ArrowLeft} />
                    </Link>
                    <Grid.Row>
                        <Header as='h2'>Final Draft</Header>
                    </Grid.Row>
                    <p>
                        Here is a final draft based on the feedback you gave us in the rough draft! Ask for a revision or get started with a landscaper!
                    </p>
                    <Grid.Row>
                        <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                            <FigmaEmbed url={this.props.figma} style={{ width: "540px", margin: "30px" }} />
                        </div>
                    </Grid.Row>
                    <Grid.Row>
                        <Button.Group>
                            <Button>Download Design</Button>
                            <Button onClick={this.HandleClick} >Ask for Revision</Button>
                            <Button ><Link to={ROUTES.CONTRACTORS} style={{ textDecoration: 'none', color: "black" }}>Hire Landscaper</Link></Button>
                        </Button.Group>
                    </Grid.Row>
                    <Grid.Row>
                        <Form success className='attached fluid segment' onSubmit={this.formSubmit}>
                            <Form.Input  disabled = {this.state.final.approved && !this.state.feedbackState} fluid label='Feedback' name ='feedback' placeholder={this.state.final.feedback} onChange={this.handleChange} type='text'  />
                            <Message 
                                hidden = {!this.state.final.approved && !this.state.feedbackState}
                                header='Feedback Received:' 
                                content= {this.state.final.feedback || 'feedback'}/>
                            {feedbackButton}
                        </Form>
                    </Grid.Row>
                    <Link to="/project/user_revision" style={{ position: "absolute", left: "90%", top: "250px" }}>
                        <img src={ArrowRight} />
                    </Link>
                </Container>
            </Grid>

        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Completed);
