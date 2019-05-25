import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Container, Header } from 'semantic-ui-react';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import * as ROUTES from "../../../../utilities/constants/routes";
import backgroundTemp from '../../../../Images/TempBackground.PNG';
import Waiting from '../../../../components/Waiting/Waiting';
import Payment from '../Concept/Payment/Payment'

class Concept extends React.Component{

    project;

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            completed: false,
            approved: false,
            isPaid: false,
            video: null,
            schedule: null
        }
        this.doSetProject = this.doSetProject.bind(this);
    }

    doSetProject = async () => {
        this.project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        const completed = await this.project.concept.completed;
        const approved = await this.project.concept.approved;
        const video = await this.project.concept.video;
        const isPaid = await this.project.concept.isPaid;
        //const schedule = await this.project.concept.schedule;

        this.setState({
            completed: completed,
            approved: approved,
            paid: false,
            video: video,
            isPaid: isPaid,
            schedule: null,
            loading: false
        });
    }

    componentWillMount(){
         this.doSetProject();
    }

    render(){
        console.log(this.state);
        this.state.completed= true;
        if(this.state.loading){
            return (<div>Loading...</div>)
        }
        //change this to waiting component
        if(!this.state.completed){
            return <div> Waiting </div>
        }

        //backgroundImage: "url(" + backgroundTemp + ")",
        //the one I'm doing
        if(this.state.completed && !this.state.approved){
            return (
                <div>
                    <Grid style={{textAlign: "center", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
                        <Container>
                            <br/>
                            <Header as='h1'>Concept Designs</Header>
                            <Header as='h3'> Watch the video and pick your favorite concept to <br/> keep the project moving </Header>
                            <br/>
                            <br/>
                            <iframe width="560" height="315"
                                    src="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG"
                                    align="middle"
                                    frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
                            </iframe>
                            <br/>
                            <br/>
                            <iframe src="https://app.acuityscheduling.com/schedule.php?owner=17045777" width="560" height="315"
                                    frameBorder="0">
                            </iframe>
                            <script src="https://embed.acuityscheduling.com/js/embed.js" type="text/javascript"> </script>
                        </Container>
                    </Grid>
                </div>
            )
        }

        if(this.state.completed && this.state.approved && !this.state.isPaid){
            return (<Payment/>)
        }

    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Concept);
