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
            Show: false,
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
            Show: !this.state.Show
        });
    }

    componentDidMount() {
        this.setState({ loading: true })
    }
    
    handleNav = () => {
        this.props.formSubmit()
        this.props.handleStateChange()
    }

    handleRedirect = () => {
        this.props.history.push(ROUTES.CONTRACTORS)
    }


    render() {
        let feedbackButton;
        if(!this.props.final.approved) {
            feedbackButton = 
            <Button 
            data-tip='Submit your design feedback'
            content='Submit'
            style={{backgroundColor:'#84DB95', paddingTop:'15px'}}
            onClick={this.handleSuccess}
            color='blue'>
            Submit</Button>
        }else {
            feedbackButton = <Button 
            disabled
            style={{backgroundColor:'#84DB95', paddingTop:'15px'}}
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
        let Show
        if(this.state.Show){
            Show =
            <Editor 
                state='final' 
                Show={this.state.Show} 
                approved={this.props.final.approved} 
                feedback={this.props.final.feedback} 
                feedbackButton={feedbackButton} 
                handleChange={this.props.handleChange} 
                feedbackState={this.state.feedbackState} 
                handleNav={this.handleNav} /> 
        }
        return (
            // <Container fluid textAlign='center' text='true'>
                <Grid columns='two' style={{backgroundColor:'#84DB95', position:'absolute', top:0, left:0, right:0, height:'100vh', marginTop:'2px'}}>
                    <Container><ProjectStatus state="final" /></Container>
                    <Grid.Row>
                        {/* <Container style={{textAlign: 'center'}}>
                        <Grid.Row >
                            <Header as='h2'>Final Draft</Header>
                        </Grid.Row>
                        <p>
                            Here is a final draft based on the feedback you gave us in the rough draft! Ask for a revision or get started with a landscaper!
                        </p>
                        </Container> */}
                            <Link data-tip='go to rough draft' to="/project/user_draft" style={{ position: "absolute", right: "90%", top: "250px" }}>
                                <img src={ArrowLeft} />
                                <ReactToolTip />
                            </Link>
                        <Grid.Column style={{position:'relative', paddingLeft:'9%', paddingRight: '5px', width: '50%'}}>
                                <div style={{ backgroundColor: "#F5F5F5", boxShadow: '0px 0px 6px 1px rgba(0,0,0,0.1)', borderRadius: "4px", paddingBottom:'10px' }}>
                                    <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                                    <FigmaEmbed url={this.props.final.figma} style={{ display:'block', width:'97%', marginLeft:'10px', marginRight:'10px', border: '1px solid grey', borderRadius: "4px"}} />
                                </div>
                        </Grid.Column>
                        <Grid.Column style={{position:'relative', paddingRight:'9%', paddingLeft: '5px', width:'50%'}}>
                            <Grid.Row style={{ paddingLeft: "10px"}}>
                        <Editor 
                            state='final' 
                            Show={this.state.Show} 
                            approved={this.props.final.approved} 
                            feedback={this.props.final.feedback} 
                            feedbackButton={feedbackButton} 
                            handleChange={this.props.handleChange} 
                            feedbackState={this.state.feedbackState} 
                            handleNav={this.handleNav} /> 
                            </Grid.Row>
                        </Grid.Column>

                        <Link data-tip='go to rough draft' to="/project/user_draft" style={{ position: "absolute", left: "90%", top: "250px" }}>
                            <img src={ArrowRight} />
                            <ReactToolTip />
                        </Link>
                    </Grid.Row>
                </Grid>
            // <Grid columns='two'>
            //     <Container fluid textAlign='center' text='true'>
            //     <Container><ProjectStatus state="final" /></Container>
            //         <Link data-tip='go to rough draft' to="/project/user_draft" style={{ position: "absolute", right: "90%", top: "250px" }}>
            //             <img src={ArrowLeft} />
            //             <ReactToolTip />
            //         </Link>
            //         <Grid.Row style={{ paddingTop: '20px' }}>
            //             <Header as='h2'>Final Draft</Header>
            //         </Grid.Row>
            //         <p>
            //             Here is a final draft based on the feedback you gave us in the rough draft! Ask for a revision or get started with a landscaper!
            //         </p>
            //         <Grid.Row style={{ paddingTop: '20px'}}>
            //                 <Grid.Column >
            //                     <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
            //                         <h1 style={{ backgroundColor: "#84<DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
            //                         <FigmaEmbed url={this.props.final.figma} style={{ width: "540px", margin: "30px" }} />
            //                     </div>
            //                 </Grid.Column>
            //                 <Grid.Column>
            //                 <Editor 
            //                     state='final' 
            //                     Show={this.state.Show} 
            //                     approved={this.props.final.approved} 
            //                     feedback={this.props.final.feedback} 
            //                     feedbackButton={feedbackButton} 
            //                     handleChange={this.props.handleChange} 
            //                     feedbackState={this.state.feedbackState} 
            //                     handleNav={this.handleNav} /> 
            //                 </Grid.Column>
            //             </Grid.Row>
            //             <div style={{ backgroundColor: "white", boxShadow: "6px 6px 16px 0px rgba(0,0,0,0.2)", borderRadius: "4px" }}>
            //                 <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
            //                 <FigmaEmbed url={this.props.final.figma} style={{ width: "540px", margin: "30px" }} />
            //             </div>
            //         <Grid.Row style={{ paddingTop: '20px', paddingBottom: '20px'}}>                    
            //             <Button.Group style={{ paddingTop: '20px', paddingBottom: '20px'}}>
            //                 <Button style={{backgroundColor:'#84DB95'}} data-tip='Download your design' onClick={this.props.mediaLink}>Download Design</Button>
            //                 <Button style={{backgroundColor:'#AAD5F7'}} data-tip='Ask for a revision and leave design feedback' onClick={this.HandleClick} >Ask for Revision</Button>
            //                 <Button style={{backgroundColor:'#84DB95'}} data-tip='Click here to get quotes from landscapers' onClick={this.handleRedirect} >Hire Landscaper</Button>
            //             </Button.Group>
            //         </Grid.Row>
            //         <Grid.Row style={{ paddingBottom: '50px'}}>
            //             {Show}
            //         </Grid.Row>
            //         {RightArrow}
            //     </Container>
            // </Grid>
        )
    }
}

const condition = role => role > 0 && role !== 2;

export default withAuthorization(condition)(Completed);
