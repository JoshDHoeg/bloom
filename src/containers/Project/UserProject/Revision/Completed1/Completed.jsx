// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session';
import { Container, Header, Button, Icon, Grid, Segment, Form, Message, GridColumn, GridRow } from 'semantic-ui-react'
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
import ReactToolTip from 'react-tooltip';


library.add(faArrowRight);
library.add(faArrowLeft);

class Completed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackState: false,
            loading: false,
            revisions: false,
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
            revisions: !this.state.revisions
        });
    }


    componentDidMount() {
        this.setState({ loading: true })
    }

    render() {
        console.log('its fucked here', this.props.revision.approved)
        let feedbackButton;
        if(!this.props.revision.approved) {
            feedbackButton = <Button 
            data-tip='Submit your revision feedback'
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
        console.log('current Revision', this.props.currentRevision)
        console.log('rcount', this.props.stage.rcount)
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
            </Link>
        }
        let LeftArrow;
        let revision = Number(this.props.currentRevision)
        console.log('wtf10', this.props.revision.approved)
        if(revision > 0){
            let revision = Number(this.props.currentRevision)
            let link = "/project/user_revision/"+(revision-1)
            LeftArrow =
            <Link data-tip='go to last revision' to={link} style={{ position: "absolute", right: "90%", top: "250px"}} onClick={this.props.handleStateChange}>
                <img src={ArrowLeft} />
            </Link>
        }else{
            LeftArrow =
            <Link data-tip='go to final design' to="/project/user_final" style={{ position: "absolute", right: "90%", top: "250px"}}>
                <img src={ArrowLeft} />
            </Link>
        }
        return (
            <Grid>
                <Container><ProjectStatus state={'revision'} currentRevision={this.props.currentRevision} /></Container>
                <Container textAlign='center' text='true'>
                    {LeftArrow}
                    <Grid.Row style={{ paddingTop: '20px' }}>
                        <Header as='h2'>Revision</Header>
                    </Grid.Row>
                    <Grid.Row>
                    <p>We listened to your feedback and came up with a new version of your design based on what you said, let us know how we did!</p>
                    </Grid.Row>
                    <Grid.Row style={{ paddingTop: '20px' }}>
                            <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
                            <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                                <FigmaEmbed url={this.props.revision.figma} style={{ width: "540px", margin: "30px" }} />
                            </div>
                    </Grid.Row>
                    <Grid.Row >
                        <Button.Group style={{ paddingTop: '20px', paddingBottom: '20px'}}>
                            <Button data-tip='Download your design' onClick={this.props.mediaLink}>Download Design</Button>
                            <Button data-tip='Ask for a revision and leave feedback' onClick={this.HandleClick} >Ask for Revision</Button>
                            <Button data-tip='Get quotes from contractors' onClick={this.props.contractorState}><Link to={ROUTES.CONTRACTORS} style={{ textDecoration: 'none', color: "black" }}>Hire Landscaper</Link></Button>
                        </Button.Group>
                    </Grid.Row>
                    <Grid.Row style={{ paddingBottom: '50px'}}>
                        <Message hidden = {!this.state.revisions}>
                            <Form success onSubmit={this.handleNav} className='attached fluid' onSubmit={this.props.formSubmit}>
                                <Form.Input  disabled = {this.props.revision.approved && !this.state.feedbackState} fluid label='Feedback' name ='feedback' placeholder={this.props.revision.feedback} onChange={this.props.handleChange} type='text'  />
                                <Message 
                                    success
                                    hidden = {!this.props.revision.approved}
                                    header='Feedback Received:' 
                                    content= {this.props.revision.feedback || 'feedback'}/>
                                <Message 
                                    success
                                    hidden = {!this.state.feedbackState}
                                    header='Feedback Received:' 
                                    content= {this.props.revision.feedback || 'feedback'}/>
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

const condition = role => role > 0;

export default withAuthorization(condition)(Completed);
