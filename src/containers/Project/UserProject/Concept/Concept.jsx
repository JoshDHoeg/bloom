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
    concept;
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            completed: false,
            concept: {
                approved: false,
                isPaid: false,
                video: null,
                schedule: null
            }
        }
       // this.completed = this.completed.bind(this)
    }

    componentDidMount() {
        this.setState({ loading: true, edit: this.props.edit });
        if(this.props.location.state){
          this.setState({projectIndex: this.props.location.state.projectIndex});
          this.getProjectState(this.props.location.state.projectIndex);
        } else{
          this.setState({projectIndex: 0});
          this.getProjectState(0);
        }
      }

    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.concept = await project.concept;
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            concept: {
                ...this.concept.getAll()
            }
        }

        this.setState(state);
        return state;
    }

    render(){
        console.log('Paid?', this.state.concept.isPaid)
        console.log(this.state);
        if(this.state.loading){
            return (<div>Loading...</div>)
        }
        //change this to waiting component
        if(!this.state.concept.completed){
            return (<Waiting/>)
        }

        //backgroundImage: "url(" + backgroundTemp + ")",
        //the one I'm doing
        if(this.state.concept.completed && !this.state.concept.approved){
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

        if(this.state.concept.completed && this.state.concept.approved && !this.state.concept.isPaid){
            return (<Payment/>)
        }

    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Concept);
