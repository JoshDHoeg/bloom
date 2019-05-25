import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Container, Header } from 'semantic-ui-react';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import * as ROUTES from "../../../../utilities/constants/routes";
import backgroundTemp from '../../../../Images/TempBackground.PNG';
import Waiting from '../../../../components/Waiting/Waiting';
import Payment from '../Concept/Payment/Payment';
import Completed from './Completed/Completed';

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
            return (<Completed/>)
        }

        if(this.state.completed && this.state.approved && !this.state.concept.isPaid){
            return (<Payment/>)
        }

    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Concept);
