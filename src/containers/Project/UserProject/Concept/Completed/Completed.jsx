import React from 'react';
import './completed.scss';
import introJs from 'intro.js';
import 'intro.js/introjs.css';
import logo from '../../../../../Images/TempLogo.JPG'
import { Grid, Container, Header, Segment, Item, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import YoutubeEmbedVideo from "youtube-embed-video";
import ProjectStatus from '../../../../../components/ProjectStatus/ProjectStatus';
import { withAuthorization } from '../../../../../utilities/Session';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArrowRight from '../../../../../assets/images/icons/ArrowRight.svg';
import { faArrowRight , faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ReactToolTip from 'react-tooltip'
import Sidebar from '../../../../../components/Navigation/UserNavigation';
library.add(faArrowRight)
library.add(faArrowLeft)


class Completed extends React.Component{
    componentDidMount() {
        if(!this.props.user.tour1){
        introJs().start();
        this.props.tour1();
        }
    }
    render(){
        let video
        video = this.props.concept.video;
        let RightArrow
        if(this.props.concept.completed && this.props.concept.approved && this.props.concept.approveterms && !this.props.concept.isPaid && (this.props.stage.stage === 'draft' || this.props.stage.stage === 'concept')) {
            RightArrow =
            <Link data-tip='go to payment' to="/user_payment" style={{ position: "absolute", left: "90%", top: "250px" }}>
            <ReactToolTip />
            <img src={ArrowRight} />
            </Link>
        }else{
            RightArrow =
            <Link data-tip='go to rough draft' to="/project/user_draft" style={{ position: "absolute", left: "90%", top: "250px" }}>
            <ReactToolTip />
            <img src={ArrowRight} />
            </Link>
        }
        let message;
        if(!this.props.concept.approved){
            message =
            'Your Designer has prepared a few concept designs for you. Check out the video and schedule a feedback call with your Project Manager'
        }else if(this.props.concept.approved && !this.props.concept.isPaid){
            message =
            'We love your feedback and will do our best to incorporate it in your design. In the mean time, you can go to the next page to pay for your Final Design. When your Rough Draft is ready, it will show up two pages to the right.'
        }else if(this.props.concept.approved && this.props.concept.isPaid){
            message=
            'We will work hard on your Rough Draft, thank you for your prompt payment!'
        }
        return (
            <Grid columns='two'>
                <ProjectStatus state="concept" />
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
                <Grid.Row style={{padding:'0px', paddingBottom:'50px' }}>
                <Grid.Column style={{ position: 'relative', paddingLeft: '9%', width: '50%', paddingRight: '10px' }}>
                    <Segment raised style={{borderBottom:'5px solid #AAD5F7'}}>
                        <Grid.Row data-intro='Watch the video below to see the different concept designs your designer has prepared for you' style={{ paddingTop:'10px', textAlign:'center' }}>
                            <Header as='h2'>Concept Design Video</Header>
                            <Item>Watch this video to see the concept designs your designer has prepared for you</Item>
                        </Grid.Row>
                        <YoutubeEmbedVideo videoId={this.props.concept.video} suggestions={false} style={{ width: "100%", padding: "30px" }}/>
                    </Segment>
                </Grid.Column>
                <Grid.Column style={{ position: 'relative', paddingRight: '9%', paddingLeft: '6px', width: '50%' }}>
                    <Segment raised  style={{borderBottom:'5px solid #AAD5F7'}}>
                        <Grid.Row data-intro="After you've viewed your concept designs, take some time to think about what feedback you may have and then schedule a call with your project manager by selecting a date below" style={{ paddingTop:'10px', paddingBottom:'10px', textAlign:'center' }}>
                            <Header as='h2'>Schedule a Feedback Call</Header>
                            <Item>Once you've watched the concept design video, schedule a quick feedback call by selecting a date on the calendar</Item>
                        </Grid.Row>
                        <iframe src="https://app.acuityscheduling.com/schedule.php?owner=17045777&appointmentType=10368032" width="100%" height="550px" frameBorder="0"></iframe>
                        <script src="https://embed.acuityscheduling.com/js/embed.js" type="text/javascript"></script>
                    </Segment>
                </Grid.Column>
                </Grid.Row>
                {RightArrow}
            </Grid>
        )
    }
}

const condition = role => role > 0;
export default withAuthorization(condition)(Completed);
