import React, { Component } from 'react';
import waitingPage from '../../../../components/Waiting/Waiting';
import CompletedPage from './Completed/Completed.jsx';
import { withAuthorization } from '../../../../utilities/Session/index';


class Draft extends Component {
    project;

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            completed: false,
            approved: false,
            video: "https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
            media:'',
            figma: ''
        }
        this.doSetProject = this.doSetProject.bind(this);
    }
    doSetProject = async () => {
        this.project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        const completed = await this.project.concept.completed;
        const approved = await this.project.concept.approved;
        const video = await this.project.concept.video;
        //const schedule = await this.project.concept.schedule;

        this.setState({
            completed: completed,
            approved: approved,
            video: video,
            loading: false
        });
    }
    componentWillMount(){
        this.doSetProject();
   }

    render() {
        if(this.state.completed) {
            return(
                <div>
                    <waitingPage/>
                </div>
            );
        } else {
        return(
            <div>
                <CompletedPage video = {this.state.video} figma = {this.state.figma} media = {this.state.media}/>
            </div>
        );}
    }

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Draft);