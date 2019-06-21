//BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import WaitingPage from '../../../../components/Waiting/Waiting';
import CompletedPage from './Completed/Completed.jsx';
import { withAuthorization } from '../../../../utilities/Session/index';
import { Route } from 'react-router-dom';
import './draft.sass'
class Draft extends Component {
    concept;
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
            },
            concept: {
                approved: false,
                approveterms: false,
                isPaid: false,
            }
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.mediaLink = this.mediaLink.bind(this);
    }

    formSubmit = () => {
        this.draft.feedback = this.state.draft.feedback;
        this.draft.approved = true;
        this.stage.stage = 'final'
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            draft: {
                ...this.state.draft,
                [event.target.name]: event.target.value,
            }
        });
    }
    
    mediaLink() {
        window.open(
            this.state.draft.media,
            '_blank')
    }

    handleStateChange = () => {
        console.log('working')
        this.setState({
            draft: [],
            stage: []
        })
        this.componentDidMount()
    }

    componentDidMount() {
        this.setState({ loading: true, edit: this.props.edit });
        this.getProjectState();
    }
    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.draft = await project.draft;
        this.stage = await project.stage;
        this.concept = await project.concept;
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            draft: {
                ...this.draft.getAll()
            },
            stage: {
                stage: this.stage.stage
            },
            concept: {
                ...this.concept.getAll()
            }
        }
        this.setState(state);
        return state;
    }

    render() {
        if(!this.state.draft.completed){
            return( <WaitingPage stage={this.state.stage} state="draft"/>    );             
        } else {
            return( <CompletedPage concept={this.state.concept} mediaLink={this.mediaLink} handleStateChange={this.handleStateChange} handleChange={this.handleChange} formSubmit={this.formSubmit} draft={this.state.draft} stage={this.state.stage} /> );
        }
    }

}

const condition = role => role > 0;

export default withAuthorization(condition)(Draft);