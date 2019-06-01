import React, { Component } from 'react';
import WaitingPage from '../../../../components/Waiting/Waiting';
import CompletedPage from './Completed/Completed.jsx';
import { withAuthorization } from '../../../../utilities/Session/index';


class Draft extends Component {
    draft;
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            draft: {
                completed: false,
                approved: false,
                video: "https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                media:'',
                figma: ''
            }
        }
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
        this.draft = await project.draft;
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            draft: {
                ...this.draft.getAll()
            }
        }
        this.setState(state);
        return state;
    }

    render() {
        if(!this.state.draft.completed){
            return( <WaitingPage state="draft"/>    );             
        } else {
            return( <CompletedPage video = {this.state.video} figma = {this.state.figma} media = {this.state.media}/> );
        }
    }

}

const condition = role => role > 0;

export default withAuthorization(condition)(Draft);