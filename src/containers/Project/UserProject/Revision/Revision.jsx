// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import WaitingPage from '../../../../components/Waiting/Waiting';
import CompletedPage1 from './Completed1/Completed';


class Revision extends React.Component{
    revision;
    stage;
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            loading: false,
            revision: {
                completed: false,
                figma: '',
                feedback: '',
                approved: false,
            },
            stage: {
                stage: '',
                rcount: ''
            },
            currentRevision: ''
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.mediaLink = this.mediaLink.bind(this);
        this.contractorState = this.contractorState.bind(this)
        this.addRevision = this.addRevision.bind(this)
      }

    formSubmit = () => {
        this.revisions[this.state.currentRevision].approved = true
        console.log('why', this.revisions)
        let number = this.state.stage.rcount
        console.log('number', number)
        let result = Number(number)
        console.log('result', result)
        result = result+1;
        let result2 = String(result);
        console.log('result2', result2)
        this.stage.rcount = result2;
        this.addRevision();
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            revision: {
                ...this.state.revision,
                [event.target.name]: event.target.value,
            }
        });
    }

    handleStateChange = () => {
        console.log('working')
        this.setState({
            revision: [],
            stage: []
        })
        this.componentDidMount()
    }

    mediaLink() {
        window.open(
            this.state.draft.media,
            '_blank')
    }

    componentDidMount() {
       this.setState({ loading: true, edit: this.props.edit });
       this.getProjectState();
      }

    contractorState() {
        this.stage.stage = 'contractors'
        console.log('stage',this.state.stage.stage)
    }

    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.revisions = await project.revisions;
        let string = this.props.location.pathname;
        var array = string.split("/");
        var currentRevision = array[3];
        this.stage = await project.stage;
        const state = await {
            loading: false,
            revision: this.revisions[currentRevision].data,
            stage: {
                stage: this.stage.stage,
                rcount: this.stage.rcount
            },
            currentRevision: currentRevision
        }

        console.log('approved?', this.state.revision.approved)
        this.setState(state);
        return state;
    }
    addRevision(){
        this.props.firebase.doCreateRevision(this.props.firebase.user.uid, this.state.revision.feedback, this.state.stage.rcount, this.props.firebase.activeProject, true);
    }

    render(){
        console.log('revision', this.state.currentRevisions)
        if(!this.state.revision.completed){
            return( <WaitingPage stage={this.state.stage} handleStateChange={this.handleStateChange} stage={this.state.stage} currentRevision={this.state.currentRevision} state="revision"/> );             
        } else {
            return( <CompletedPage1 contractorState={this.contractorState} mediaLink={this.mediaLink} handleStateChange={this.handleStateChange} currentRevision={this.state.currentRevision} count={this.state.count} handleChange={this.handleChange} formSubmit={this.formSubmit} revision={this.state.revision} stage={this.state.stage}/> );
        }
    }
}

const condition = role => role > 0;

export default withAuthorization(condition)(Revision);