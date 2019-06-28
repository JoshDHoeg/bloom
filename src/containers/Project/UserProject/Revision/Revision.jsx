// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import WaitingPage from '../../../../components/Waiting/Waiting';
import CompletedPage from './Completed/Completed';
import * as ROUTES from '../../../../utilities/constants/routes';


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
        let number = this.state.stage.rcount
        let result = Number(number)
        result = result+1;
        let result2 = String(result);
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
        this.setState({
            revision: [],
            stage: []
        })
        this.componentDidMount()
    }

    mediaLink() {
        window.open(
            this.state.revision.media,
            '_blank')
    }

    componentDidMount() {
       this.setState({ loading: true, edit: this.props.edit });
       this.getProjectState();
      }

    contractorState() {
        this.stage.stage = 'contractors'
    }

    handleRedirect = () => {
        this.props.history.push(ROUTES.CONTRACTORS)
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

        this.setState(state);
        return state;
    }
    addRevision(){
        this.props.firebase.doCreateRevision(this.props.firebase.user.uid, this.state.stage.rcount, this.props.firebase.activeProject, true);
    }

    render(){
        if(!this.state.revision.completed){
            return( <WaitingPage  handleStateChange={this.handleStateChange} stage={this.state.stage} currentRevision={this.state.currentRevision} state="revision"/> );             
        } else {
            return( <CompletedPage contractorState={this.contractorState} mediaLink={this.mediaLink} handleStateChange={this.handleStateChange} currentRevision={this.state.currentRevision} count={this.state.count} handleChange={this.handleChange} formSubmit={this.formSubmit} revision={this.state.revision} stage={this.state.stage} handleRedirect={this.handleRedirect} /> );
        }
    }
}

const condition = role => role > 0 && role !== 2;

export default withAuthorization(condition)(Revision);