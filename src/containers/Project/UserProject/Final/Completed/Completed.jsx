// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session';
import { Container, Header, Button, Grid, Segment, Item, Divider, Image } from 'semantic-ui-react'
import * as ROUTES from "../../../../../utilities/constants/routes";
//Figma Embed import
<<<<<<< HEAD
=======
import logo from '../../../../../Images/TempLogo.JPG'
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
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
<<<<<<< HEAD
        })
    }

    HandleClick = () => {
        this.setState({
            Show: !this.state.Show
=======
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
        });
    }

    componentDidMount() {
        this.setState({ loading: true });
    }
    
    handleNav = () => {
        this.props.formSubmit();
        this.props.handleStateChange();
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
<<<<<<< HEAD
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
=======
            style={{ backgroundColor:'#84DB95' }}
            onClick={this.handleSuccess}>
            Request A Revision</Button>
        }else {
            feedbackButton = <Button 
            style={{backgroundColor:'#84DB95'}} 
            data-tip='Ask for a revision' 
            disabled>
            Request A Revision
            </Button>
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
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
<<<<<<< HEAD
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
                    <Grid.Row>
                        <Container><ProjectStatus state="final" /></Container>
                    </Grid.Row>
=======
        let message;
        if(!this.props.final.approved){
            message =
            'Your Final Design has been completed and you can check it out here! Leave feedback to receive a revision';
        }else{
            message=
            'We will work hard to use your feedback while making your revision. When your revision is ready you can find it on the page to the right.';
        }
        return (
            <Grid columns='two' style={{paddingBottom:'50px'}}>
                <ProjectStatus state="final" />
                <Grid.Row style={{marginTop:'6%', paddingBottom:'5%'}}>
                    <Grid.Column style={{ position: 'relative', paddingLeft: '9%', width: '50%', paddingRight: '10px'}}>
                        <Header as='h2'>
                            Welcome {this.props.user.name}!
                        </Header>
                        <Item style={{fontSize:'16px'}}>
                            {message}
                        </Item>
                    </Grid.Column>
                    <Grid.Column style={{ position: 'relative', paddingRight: '9%', paddingLeft: '6px', width: '50%'}}>
                        <Image floated='right' src={logo} alt='blootime-logo'/> 
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ padding:'0px'}}>
                    <Grid.Column style={{ position:'relative', paddingLeft:'9%', paddingRight: '10px', width: '50%' }}>
                        <Segment raised style={{borderBottom:'5px solid #84DB95'}}>
                            <Grid.Row style={{paddingBottom:'50px'}}>
                                <Header floated='left' style={{ marginTop:'0px' }} as='h2'>Final Draft</Header>
                                <Button floated='right' style={{ backgroundColor:'#84DB95', marginTop:'0px' }} data-tip='Download your design' onClick={this.props.mediaLink}>Download Your Design</Button>
                            </Grid.Row>
                            <Item style={{ textAlign:'center', paddingBottom:'10px' }}> Here is a final draft based on the feedback you gave us in the rough draft! Ask for a revision or get started with a landscaper!</Item>
                            <FigmaEmbed url={this.props.final.figma} style={{ display:'block', width:'100%', border: '1px solid grey', borderRadius: "8px" }} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column style={{ position:'relative', paddingRight:'9%', paddingLeft: '6px', width:'50%' }}>
                        <Grid.Row style={{ paddingLeft: "15px", paddingRight:'15px', paddingBottom:'16px' }}>
                            <Editor
                                state='final'
                                approved={this.props.final.approved}
                                feedback={this.props.final.feedback}
                                handleNav={this.props.handleNav}
                                feedbackButton={feedbackButton}
                                handleChange={this.props.handleChange}
                                feedbackState={this.state.feedbackState}
                                handleNav={this.handleNav} />
                        </Grid.Row>
                        <Grid.Row> 
                            <div>
                                <Segment raised style={{borderBottom:'5px solid #84DB95'}}>
                                    <Header as='h3' style={{ textAlign:'center', paddingTop:'10px' }}>Do It Yourself or Get Some Help</Header>
                                    <Grid.Row style={{ textAlign:'center', paddingBottom:'10px' }}>
                                    <Item>Let us help you get started or get quotes from trusted contractors</Item>
                                    </Grid.Row>
                                    <Grid.Row style={{ display:'flex', justifyContent:'center' }}>
                                        <Button floated='left' style={{ backgroundColor:'#84DB95'}} data-tip='Click here to go to our blog ' onClick={this.props.blogLink} >Get Help</Button>
                                        <Divider horizontal>Or</Divider>
                                        <Button floated='right' style={{ backgroundColor:'#84DB95'}} data-tip='Click here to get quotes from landscapers' onClick={this.props.handleRedirect} >Hire Landscaper</Button>
                                    </Grid.Row>
                                </Segment>
                            </div>
                        </Grid.Row> 
                    </Grid.Column>
                </Grid.Row>
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
                    <Link data-tip='go to rough draft' to="/project/user_draft" style={{ position: "absolute", right: "90%", top: "250px" }}>
                                <img src={ArrowLeft} />
                                <ReactToolTip />
                    </Link>
<<<<<<< HEAD
                        {/* <Container style={{textAlign: 'center'}}>
                        <Grid.Row >
                            <Header as='h2'>Final Draft</Header>
                        </Grid.Row>
                        <p>git 
                            Here is a final draft based on the feedback you gave us in the rough draft! Ask for a revision or get started with a landscaper!
                        </p>
                        </Container> */}
                        <Grid.Row style={{ position:'absolute', top:'10%'}}>
                            <Grid.Column style={{position:'relative', paddingLeft:'9%', paddingRight: '10px', width: '50%'}}>
                                    <div style={{ backgroundColor: "#F5F5F5", boxShadow: '0px 0px 6px 1px rgba(0,0,0,0.1)', borderRadius: "4px", paddingBottom:'10px' }}>
                                        <h1 style={{ backgroundColor: "#84DB95", color: "white", textAlign: "center", fontSize: "15px", padding: "10px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>The Design</h1>
                                        <FigmaEmbed url={this.props.final.figma} style={{ display:'block', width:'97%', marginLeft:'10px', marginRight:'10px', border: '1px solid grey', borderRadius: "4px"}} />
                                    </div>
                            </Grid.Column>
                        <Grid.Column style={{position:'relative', paddingRight:'10%', paddingLeft: '10px', width:'50%'}}>
                        <Editor 
                            state='final' 
                            Show={this.state.Show} 
                            approved={this.props.final.approved} 
                            feedback={this.props.final.feedback} 
                            feedbackButton={feedbackButton} 
                            handleChange={this.props.handleChange} 
                            feedbackState={this.state.feedbackState} 
                            handleNav={this.handleNav} /> 
                        </Grid.Column>
                     </Grid.Row>
                    <Link data-tip='go to rough draft' to="/project/user_draft" style={{ position: "absolute", left: "90%", top: "250px" }}>
                            <img src={ArrowRight} />
                            <ReactToolTip />
                    </Link>
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
=======
                {RightArrow}
            </Grid>
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
        )
    }
}

<<<<<<< HEAD
const condition = role => role > 0 && role !== 2;
=======
const condition = role => role > 0;
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa

export default withAuthorization(condition)(Completed);
