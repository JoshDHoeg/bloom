import React from 'react';
import './completed.scss';
import { Grid, Container, Header, Embed } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import YoutubeEmbedVideo from "youtube-embed-video";
import ProjectStatus from '../../../../../components/ProjectStatus/ProjectStatus';
import { withAuthorization } from '../../../../../utilities/Session';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArrowRight from '../../../../../assets/images/icons/ArrowRight.svg';
import { faArrowRight , faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PaymentPage from '../../Payment/Payment'
import ReactToolTip from 'react-tooltip'
library.add(faArrowRight)
library.add(faArrowLeft)

class Completed extends React.Component{
    render(){
        console.log('stage2', this.props.stage)
        let video
        video = this.props.concept.video;
        let RightArrow
        if(this.props.concept.completed && this.props.concept.approved && this.props.concept.approveterms && !this.props.concept.isPaid && (this.props.stage.stage === 'draft' || this.props.stage.stage === 'concept')) {
            RightArrow =
            <Link data-tip='go to payment' to="/user_payment" style={{position: "absolute", left: "90%", top: "250px"}}>
            <ReactToolTip />
            <img src={ArrowRight} />
            </Link>
        }else{
            RightArrow =
            <Link data-tip='go to rough draft' to="/project/user_draft" style={{position: "absolute", left: "90%", top: "250px"}}>
            <ReactToolTip />
            <img src={ArrowRight} />
            </Link>
        }
        return (
            <div className='Completed'>
            <Grid >
            <Container><ProjectStatus state="concept"/></Container>
                <Container fluid textAlign='center' text='true'>
                    {/*<Link to="/projects/user_draft" style={{position: "absolute", right: "90%", top: "25%"}}>*/}
                        {/*<FontAwesomeIcon icon="arrow-left" size="5x" color="black"/>*/}
                    {/*</Link>*/}
                <Grid.Row  style={{paddingBottom:'20px', paddingTop: '20px'}}>
                    <Header as='h1'>Concept Designs</Header>
                </Grid.Row>
                <Grid.Row  style={{paddingBottom:'20px'}}>
                    <Header as='h3'> Watch the video and pick your favorite concept to <br/> keep the project moving </Header>
                </Grid.Row>
                <Grid.Row  style={{paddingBottom:'20px'}}>
                <YoutubeEmbedVideo videoId={this.props.concept.video} suggestions={false} style={{ width: "600px", padding: "30px" }} />
                </Grid.Row>
                <Grid.Row  style={{paddingBottom:'100px'}}>
                <iframe src="https://app.acuityscheduling.com/schedule.php?owner=17045777&appointmentType=10368032" width="90%" height="500" frameBorder="0"></iframe>
                <script src="https://embed.acuityscheduling.com/js/embed.js" type="text/javascript"></script>
                </Grid.Row>
                {RightArrow}
                </Container>
            </Grid>
            </div>
        )
    }
}

const condition = role => role > 0;
export default withAuthorization(condition)(Completed);
