import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Container, Header } from 'semantic-ui-react';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import * as ROUTES from "../../../../utilities/constants/routes";
import backgroundTemp from '../../../../Images/TempBackground.PNG';
import Waiting from '../../../../components/Waiting/Waiting';
import Completed from './Completed/Completed';
import Approve from './Approve/Approve';


class Concept extends React.Component{

    project;

    //approved = schedule for our purposes here
    constructor(props){
        super(props);
        this.state = {
            completed: false,
            scheduled: false,
            loading: true,
            video: null
        }
        this.doSetProject = this.doSetProject.bind(this);
    }

    doSetProject = async () => {
        this.project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        const completed = await this.project.concept.completed;
        //const scheduled = await this.project.concept.scheduled;
        const video = await this.project.concept.video;

        //eventually add scheduled prop to database
        this.setState({
            completed: completed,
            video: video,
            loading: false
        });
    }

    componentWillMount(){
         this.doSetProject();
    }

    render(){
        console.log(this.state);
        this.state.completed= true;
        this.state.scheduled = false;
        if(this.state.loading){
            return (<div>Loading...</div>)
        }

        if(!this.state.completed){
            return <Waiting state="concept"/>
        }

        if(this.state.completed && !this.state.scheduled){
            return <Completed/>
        }

        if(this.state.completed && this.state.scheduled){
            return <Approve/>
        }
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Concept);
