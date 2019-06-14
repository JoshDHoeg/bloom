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
            revision: {
                completed: false,
                figma: '',
                feedback: '',
                approved: false,
            },
            stage: {
                stage: ''
            }
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

    formSubmit = () => {
        this.revision.feedback = this.state.revision.feedback;
        this.revision.approved = true;
        this.stage.stage = 'revision2'
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
    componentDidMount() {
       this.setState({ loading: true, edit: this.props.edit });
       this.getProjectState();
      }

    getProjectState = async () => {
        const project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
        this.revision = await project.revision;
        this.stage = await project.stage;
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            revision: {
               revision: this.revision.getAll()
            },
            stage: {
                stage: this.stage.stage
            }
        }

        this.setState(state);
        return state;
    }
    render(){
        console.log('hell0', this.props.location.pathname)
        let string = this.props.location.pathname
        var array = string.split("/")
        console.log('location =', array[3])
        if(!this.state.revision.completed){
            return( <WaitingPage state="revision"/> );             
        } else {
            return( <CompletedPage1 handleChange={this.handleChange} formSubmit={this.formSubmit} revision={this.state.revision} stage={this.state.stage}/> );
        }
    }
}

const condition = role => role > 0;

export default withAuthorization(condition)(Revision);