// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session';
import { Container, Header, Button, Icon, Grid, Segment, Form, Message, GridColumn, GridRow } from 'semantic-ui-react'
import * as ROUTES from "../../../../../utilities/constants/routes";
//Figma Embed import
import Editor from '../../../../../components/Wysiwig/wysiwig'
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
            Show: false,
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
            Show: !this.state.Show
        });
    }


    componentDidMount() {
        this.setState({ loading: true })
    }

    render() {
        let feedbackButton;
        if(!this.props.revision.approved) {
            feedbackButton = <Button 
            data-tip='Submit your revision feedback'
            content='Submit'
            style={{backgroundColor:'#84DB95'}}
            onClick={this.handleSuccess} 
            color='blue'>
            Submit</Button>
        }else{
            feedbackButton = <Button 
            disabled
            style={{backgroundColor:'#84DB95'}}
            content='Submit' 
            color='blue'>
            Submit</Button>
        }
        let Feedback;
        if(this.state.Show){
            Feedback = 
            <Editor 
                state='final' 
                Show={this.state.Show} 
                approved={this.props.revision.approved} 
                feedback={this.props.revision.feedback} 
                feedbackButton={feedbackButton} 
                handleChange={this.props.handleChange} 
                feedbackState={this.state.feedbackState} 
                handleNav={this.handleNav} /> 
        }
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
                <Container><ProjectStatus state='revision' currentRevision={this.props.currentRevision} /></Container>
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
                            <Button style={{backgroundColor:'#84DB95'}} data-tip='Download your design' onClick={this.props.mediaLink}>Download Design</Button>
                            <Button style={{backgroundColor:'#AAD5F7'}} data-tip='Ask for a revision and leave feedback' onClick={this.HandleClick} >Ask for Revision</Button>
                            <Button style={{backgroundColor:'#84DB95'}} data-tip='Get quotes from contractors' onClick={this.props.contractorState}><Link to={ROUTES.CONTRACTORS} style={{ textDecoration: 'none', color: "black" }}>Hire Landscaper</Link></Button>
                        </Button.Group>
                    </Grid.Row>
                    <Grid.Row style={{ paddingBottom: '50px'}}>
                        {Feedback}
                    </Grid.Row>
                    {RightArrow}
                </Container>
            </Grid>

        )
    }
}

const condition = role => role > 0 && role !== 2;

export default withAuthorization(condition)(Completed);
