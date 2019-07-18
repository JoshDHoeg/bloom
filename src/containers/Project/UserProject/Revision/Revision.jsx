// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import WaitingPage from '../../../../components/Waiting/Waiting';
import CompletedPage from './Completed/Completed';
import * as ROUTES from '../../../../utilities/constants/routes';
<<<<<<< HEAD
=======
import Loading from '../../../../components/Loading/Loading';
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa


class Revision extends React.Component{
    revision;
    stage;
    user;
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
            user:{
                name:''
            },
            currentRevision: ''
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.mediaLink = this.mediaLink.bind(this);
        this.addRevision = this.addRevision.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this)
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

    handleStateChange = () => {
        this.setState({
            revision: [],
            stage: []
        })
        this.componentDidMount()
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
<<<<<<< HEAD
=======
            '_blank')
    }
    
    blogLink() {
        window.open(
            'https://www.bloomtimedesign.co/bloomtime-blog/', //opens needed media link?
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
            '_blank')
    }

    componentDidMount() {
       this.setState({ loading: true, edit: this.props.edit });
       this.getProjectState();
      }


    handleRedirect = () => {
        this.props.history.push(ROUTES.CONTRACTORS)
        this.stage.stage = 'contractors'
    }

    handleRedirect = () => {
        this.props.history.push(ROUTES.CONTRACTORS)
    }

    getProjectState = async () => {
        const user = await this.props.firebase.doGetUser(this.props.firebase.user.uid);
        this.user = await user;
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
            },user:{
                name: this.user.name
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
<<<<<<< HEAD
        if(!this.state.revision.completed){
            return( <WaitingPage handleStateChange={this.handleStateChange} currentRevision={this.state.currentRevision} handleStateChange={this.handleStateChange} stage={this.state.stage} currentRevision={this.state.currentRevision} state="revision"/> );             
        } else {
            return( <CompletedPage handleStateChange={this.handleStateChange} contractorState={this.contractorState} mediaLink={this.mediaLink} handleStateChange={this.handleStateChange} currentRevision={this.state.currentRevision} count={this.state.count} handleChange={this.handleChange} formSubmit={this.formSubmit} revision={this.state.revision} stage={this.state.stage} handleRedirect={this.handleRedirect} /> );
=======
        if(this.state.loading){
            return (<div style={{marginTop:'30%'}}><Loading/></div>);
        }else if(!this.state.revision.completed){
            return( <WaitingPage handleStateChange={this.handleStateChange} currentRevision={this.state.currentRevision} handleStateChange={this.handleStateChange} stage={this.state.stage} currentRevision={this.state.currentRevision} state="revision"/> );             
        } else {
            return( <CompletedPage blogLink={this.blogLink}user={this.state.user} handleStateChange={this.handleStateChange} handleRedirect={this.handleRedirect} mediaLink={this.mediaLink} handleStateChange={this.handleStateChange} currentRevision={this.state.currentRevision} count={this.state.count} handleChange={this.handleChange} formSubmit={this.formSubmit} revision={this.state.revision} stage={this.state.stage} handleRedirect={this.handleRedirect} /> );
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
        }
    }
}

const condition = role => role > 0 && role !== 2;

export default withAuthorization(condition)(Revision);