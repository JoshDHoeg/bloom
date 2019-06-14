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
        if(!this.props.revision.approved) {
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
        console.log('current Revision', this.props.currentRevision)
        console.log('rcount', this.props.stage.rcount)
        console.log('props', this.props)
        let RightArrow;
        if(this.props.currentRevision < this.props.stage.rcount){
            let link = "/project/user_revision/"+ (this.props.currentRevision + 1);
            RightArrow =                     
            <Link to={link} style={{ position: "absolute", left: "90%", top: "250px" }}>
                <img src={ArrowRight} />
            </Link>
        }else if(this.props.stage.stage === 'contractors') {
            RightArrow =                     
            <Link to="/project/user_contractors" style={{ position: "absolute", left: "90%", top: "250px" }}>
                <img src={ArrowRight} />
            </Link>
        }
        let LeftArrow;
        if(this.props.currentRevision > 0){
            LeftArrow =
            <Link to="/project/user_revision/"{...this.props.currentRevision -1} style={{ position: "absolute", right: "90%", top: "250px"}}>
                <img src={ArrowLeft} />
            </Link>
        }else{
            LeftArrow =
            <Link to="/project/user_final" style={{ position: "absolute", right: "90%", top: "250px"}}>
                <img src={ArrowLeft} />
            </Link>
        }
        return (
            <Grid>
                <Container><ProjectStatus state="revision2"/></Container>
                <Container textAlign='center' text='true'>
                    {LeftArrow}
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
                                <FigmaEmbed url={this.props.revision.figma} style={{ width: "540px", margin: "30px" }} />
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
                            <Form success className='attached fluid segment' onSubmit={this.props.formSubmit}>
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
