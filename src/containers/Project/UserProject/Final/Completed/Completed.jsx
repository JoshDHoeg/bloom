// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session';
import { Container,Segment, Header, Button, Grid, Form, Message } from 'semantic-ui-react'
import * as ROUTES from "../../../../../utilities/constants/routes";
import * as ROLES from "../../../../../utilities/constants/roles"
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


    render() {
        let feedbackButton;
        if(!this.props.final.approved) {
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
        let RightArrow;
        if(this.props.stage.stage === 'revision' || this.props.stage.stage === 'revision2'){
            RightArrow =                     
            <Link to="/project/user_revision/1" style={{ position: "absolute", left: "90%", top: "250px" }}>
                <img src={ArrowRight} />
            </Link>
        }
        return (
            <Grid>
                <Container><ProjectStatus state="final" /></Container>
                <Container fluid textAlign='center' text='true'>
                    <Link to="/project/user_draft" style={{ position: "absolute", right: "90%", top: "250px" }}>
                        <img src={ArrowLeft} />
                    </Link>
                    <Grid.Row style={{ paddingTop: '20px' }}>
                        <Header as='h2'>Final Draft</Header>
                    </Grid.Row>
                    <p>
                        Here is a final draft based on the feedback you gave us in the rough draft! Ask for a revision or get started with a landscaper!
                    </p>
                    <Grid.Row style={{ paddingTop: '20px' }}>
                        <Segment placeholder>
                            <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                                <h1 style={{ backgroundColor: "#27AE60", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                                <FigmaEmbed url={this.props.final.figma} style={{ width: "540px", margin: "30px" }} />
                            </div>
                        </Segment>
                    </Grid.Row>
                    <Grid.Row>
                        <Button.Group style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                            <Button>Download Design</Button>
                            <Button onClick={this.HandleClick} >Ask for Revision</Button>
                            <Button ><Link to={ROUTES.CONTRACTORS} style={{ textDecoration: 'none', color: "black" }}>Hire Landscaper</Link></Button>
                        </Button.Group>
                    </Grid.Row>
                    <Grid.Row style={{ paddingBottom: '20px'}}>
                        <Message hidden = {!this.state.revisions}>
                            <Form success className='attached fluid segment' onSubmit={this.props.formSubmit}>
                                <Form.Input  disabled = {this.props.final.approved && !this.state.feedbackState} fluid label='Feedback' name ='feedback' placeholder={this.props.final.feedback} onChange={this.props.handleChange} type='text'  />
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
                        </Message>
                    </Grid.Row>
                    {RightArrow}
                </Container>
            </Grid>

        )
    }
}

const condition = role => role > 0

export default withAuthorization(condition)(Completed);
