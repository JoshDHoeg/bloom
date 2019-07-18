import React, {Component} from 'react'
import {withAuthorization} from '../../utilities/Session'
import logo from '../../Images/TempLogo.JPG';
import { Container, Grid, Sticky, Header, Item, Segment } from 'semantic-ui-react'
import ProjectStatus from '../ProjectStatus/ProjectStatus';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';
import YoutubeEmbedVideo from "youtube-embed-video"; // video to display on page
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ArrowLeft from '../../assets/images/icons/ArrowLeft.svg';
import ArrowRight from '../../assets/images/icons/ArrowRight.svg';
import ReactToolTip from 'react-tooltip'
<<<<<<< HEAD
=======
import { textAlign } from '@material-ui/system';
import color from '@material-ui/core/colors/lightBlue';
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
//arrows for navigation between pages
library.add(faArrowRight);
library.add(faArrowLeft);

class Waiting extends Component { //waiting has same class format as component
    constructor(props){
        super(props);
        this.state = {
            loading: false, //sets all necessary attributes, mostly empty to be filled later
            edit: false,
            title: '',
            src: '',
            message: '',
            last: '',
            next: ''
        }
    }
    
    componentDidMount(){ //once component mounts 
        if(this.props.state === 'contractors'){ //if they are at contractor stage
            this.setState({
                title: 'Contractors', //sets state title
                src: logo,
                message: 'Your contractors haven\'t gotten us their quotes yet. You will receive a notification once they are ready!', //informs user that quote still pending
                last: '/project/user_revision',
                color: '5px solid #AAD5F7',
                top:'.5px',
                top2: '100px',
                link: null
            })
        }
        else if(this.props.state === 'payment'){  //if they are at payment stage
            this.setState({
                title: 'Payment', //sets state title
                titleNext: 'concept',
                src: logo,
                message: 'Your payment it not necessary at this time!', //user does not need to pay yet
<<<<<<< HEAD
                next: '/project/user_concept'
=======
                next: '/project/user_concept',
                color: '5px solid #AAD5F7',
                top:'20px',
                top2: '25%',
                link: null
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
            })
        }
        else if(this.props.state === 'draft'){ //if in draft stage
            this.setState({
                title: 'Draft', //sets state title
                titleNext: 'final', //next stage title
                titleLast: 'concept design', //previous stage title
                src: logo,
                message: 'Your designer is hard at work making your draft! You will receive a notification once it is ready', //provides pertinent information
                last: '/project/user_concept', //previous stage
                next: '/project/user_final', //next stage
<<<<<<< HEAD
=======
                color:'5px solid #FA907F',
                top:'.5px',
                top2: '100px',
                link: 'Wo_8Jjp7VWc'
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
            })
        }
        else if(this.props.state === 'final'){ //if in final stage
            this.setState({
                title: 'Final', //set title and previous title
                titleLast: 'rough draft',
                src: logo,
                message: 'Your designer is hard at work making your final draft! You will receive a notification once it is ready',
                last: '/project/user_draft',
                next: '/project/user_revision',
                color:'5px solid #84DB95',
                top:'.5px',
                top2: '100px',
                link: 'hKIPN0TfKuU'
            })
        }
        else if(this.props.state === 'revision'){ //these are all the same thing
            this.setState({
                title: 'Revision',
                src: logo,
                message: 'Your designer is working hard to implement all of your feedback! You will receive a notification once your revision is ready',
                last: '/project/user_final',
                next: '/project/user_contractors',
                color:'5px solid #F5BDF9',
                top:'.5px',
                top2:'100px',
                link: null
            })
        }
        else{
            this.setState({
                title: 'Concept',
                titleNext: 'rough draft',
                src: logo,
                message: 'Your designer is hard at working making your concept! You will receive a notification once it is ready',
<<<<<<< HEAD
                next: '/project/user_draft'
=======
                next: '/project/user_draft',
                color:'5px solid #AAD5F7',
                top: '.5px',
                top2: '100px',
                link: 'GQUEL6RGYuE'
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
            })
        }
    }
    render(){
        let Next
        Next = 'go to '+(this.state.titleNext) //says to go to whatever stage is next
        let RightArrow; //right arrow for navigation
        if(this.props.state !== 'final' && this.props.state !=='revision' && this.props.state !== 'contractors'){ //if not in final, revision, or contractor state
            RightArrow =
            <Link data-tip={Next} to={this.state.next} style={{ position: "absolute", left: "90%", top: "250px" }}> {/*places right arrow */}
                <ReactToolTip />
                <img src={ArrowRight} />
            </Link>
        }else if(this.props.state === 'final' && this.props.stage.stage === 'revisions'){ //if in revision stage, places arrow
            RightArrow = //styles right arrow and sets where it links to
            <Link to="/project/user_revision/0" style={{ position: "absolute", left: "90%", top: "250px" }}>
                <img src={ArrowRight} />
            </Link>
        }
        let LeftArrow; //left arrow for navitagion
        let Last;
        Last = 'go to '+(this.state.titleLast) //says to go to previous stage
        let revision = Number(this.props.currentRevision) //revision is number of current revisions
<<<<<<< HEAD
        if(this.props.state === 'revision' && revision !== 0){ //if we are in revision state and there have been revisions
=======
        if(this.props.state === 'revision' && revision === 0){
            let link = "/project/user_final";
            LeftArrow =
            <Link data-tip='go to final' to={link} style={{ position: "absolute", right: "90%", top: "250px"}} onClick={this.props.handleStateChange}>
                <ReactToolTip /> {/* moves to previous revision */}
                <img src={ArrowLeft} />
            </Link>
        }else if(this.props.state === 'revision' && revision !== 0){ //if we are in revision state and there have been revisions
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
            let revision = Number(this.props.currentRevision) //revision is current number of revisions we are on
            let link = "/project/user_revision/"+(revision-1) //links to revision value -1
            LeftArrow =
            <Link data-tip='go to revision'{...revision-1} to={link} style={{ position: "absolute", right: "90%", top: "250px"}} onClick={this.props.handleStateChange}>
                <ReactToolTip /> {/* moves to previous revision */}
                <img src={ArrowLeft} />
            </Link>
        }else if(this.props.state === 'contractors'){ //if in contractor state
<<<<<<< HEAD
            let revision = Number(this.props.stage.rcount)
            let link = "/project/user_revision/"+(revision); //links to current revision
=======
            let link = "/project/user_final"; //links to current revision
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
            LeftArrow =
            <Link to={link} style={{ position: "absolute", right: "90%", top: "250px" }}> {/* positions and styles arrow */}
                <img src={ArrowLeft} />
            </Link>
        }else if(this.props.state === 'payment'){ //if in payment state, no need for left arrow
            LeftArrow=null
        
        }else if(this.props.state !== 'concept'){
            LeftArrow = //if in concept state, same as contractors state
            <Link data-tip={Last} to={this.state.last} style={{ position: "absolute", right: "90%", top: "250px" }}>
                <img src={ArrowLeft} />
                <ReactToolTip/>
            </Link>
        }
        let Video;
        if(this.state.link !== null){
            Video =
            <Grid.Row style={{display:'block', margin:'auto'}}>
                <YoutubeEmbedVideo videoId={this.state.link} suggestions={false}  style={{ width: "100%", padding: "20px" }}/>
            </Grid.Row>
        }else if(this.state.link === null){
            Video = null
        }
        let color;
        color = this.state.color;
        return(
<<<<<<< HEAD
            <Container>
                {LeftArrow}
                <Grid.Row> {/*Styling for page, including arrows on either side, revision number */}
                    <ProjectStatus state={this.props.state} currentRevision={this.props.currentRevision}/>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column style={{textAlign: 'center', paddingBottom: '15px', paddingTop: '15px'}}>
                        <div style={{fontSize:'30px', fontWeight:'bold'}}>{this.state.title}</div>
                    </Grid.Column>
                    <Grid.Column style={{textAlign: 'center',paddingBottom: '15px'}}>
                        <img src={this.state.src}/>
                    </Grid.Column>
                    <Grid.Column style={{textAlign: 'center'}}>
                        <div style={{fontSize:'16px'}}>{this.state.message}</div>
                    </Grid.Column>
=======
            <Grid>
                <Container style={{marginTop: this.state.top}}>
                    <ProjectStatus state={this.props.state} currentRevision={this.props.currentRevision} />
                </Container>
                <Grid.Row style={{ display:'block', position: 'absolute', top: this.state.top2, margin:'auto', paddingLeft:'25%', paddingRight:'25%'}}>
                    <Segment raised style={{borderBottom: color}}>
                        <Grid.Row style={{textAlign:'center'}}>
                            <Header style={{fontWeight:'bold'}} as='h2'>{this.state.title}</Header>
                        </Grid.Row>
                        <Grid.Row style={{textAlign:'center'}}>
                            <img src={this.state.src} />
                        </Grid.Row>
                        <Grid.Row style={{textAlign:'center'}}>
                            <Item>{this.state.message}</Item>
                        </Grid.Row>
                        {Video}
                    </Segment>
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
                </Grid.Row>
                {LeftArrow}
                {RightArrow}
            </Grid>
        );
    }

}
const condition = role => role > 0; //returns true if verified user

export default withAuthorization(condition)(Waiting); //if condition returns true, exports
