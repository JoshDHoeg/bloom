//BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import WaitingPage from '../../../../components/Waiting/Waiting';
import CompletedPage from './Completed/Completed.jsx';
import { withAuthorization } from '../../../../utilities/Session/index';


class Draft extends Component {
    draft;
    stage;
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            stage:{
                stage: ''
            },
            draft: {
                completed: false,
                approved: false,
                video: "https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
                media:'',
                figma: '',
                feedback: ''
            }
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    formSubmit = () => {
        this.draft.feedback = this.state.draft.feedback;
        this.draft.approved = true;
        this.stage.stage = 'final'
        console.log('trying')
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            draft: {
                ...this.state.draft,
                [event.target.name]: event.target.value,
            }
        });
        //console.log(this.state.draft.feedback)
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
        this.stage = await project.stage;
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            draft: {
                ...this.draft.getAll()
            },
            stage: {
                stage: this.stage.stage
            }
        }
        this.setState(state);
        return state;
    }

    render() {
        if(!this.state.draft.completed){
            return( <WaitingPage state="draft"/>    );             
        } else {
            return( <CompletedPage handleChange={this.handleChange} formSubmit={this.formSubmit} draft={this.state.draft} stage={this.state.stage} /> );
        }
    }

}

const condition = role => role > 0;

export default withAuthorization(condition)(Draft);