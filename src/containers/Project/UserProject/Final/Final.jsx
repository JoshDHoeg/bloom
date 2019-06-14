// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import WaitingPage from '../../../../components/Waiting/Waiting';
import CompletedPage from './Completed/Completed.jsx';


class Final extends React.Component {
    final;
    stage;
    revisions;
    constructor(props) {
        super(props);
        this.state = {
            final: {
                completed: false,
                figma: '',
                feedback: '',
                approved: false
            },
            stage: {
                stage: '',
                rcount: ''
            }
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addRevision = this.addRevision.bind(this);
    }

    formSubmit = () => {
        this.final.feedback = this.state.final.feedback;
        this.final.approved = true;
        this.stage.stage = 'revision';
        this.addRevision();
        this.stage.rcount = (this.state.stage.rcount + 1);
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            final: {
                ...this.state.final,
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
        this.final = await project.final;
        this.stage = await project.stage;
        this.revisions = await project.revision;
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            final: {
                ...this.final.getAll()
            },
            stage: {
                stage: this.stage.stage,
                rcount: this.stage.rcount
            },
        }
        this.setState(state);
        return state;
    }

    addRevision(){
        // var newRevision = {
        //     init: false,
        //     feedback: "feedback",
        //     media:"",
        //     figma: "",
        //     completed: false,
        //     approved: false,
        // }
        // this.revisions.push(newRevision);
        // var revisions = this.revisions.collection('revisions');

        this.props.firebase.doCreateRevision(this.props.firebase.user.uid, this.state.final.feedback, '2', this.props.firebase.activeProject, true);
    }


    render(){
        console.log('does this work', this.state.stage.rcount);
        if(!this.state.final.completed){
            return( <WaitingPage state="final"/>    );             
        } else {
            return( <CompletedPage stage={this.state.stage} formSubmit={this.formSubmit} handleChange={this.handleChange} final={this.state.final}/> );
        }
    }
}

const condition = role => role > 0

export default withAuthorization(condition)(Final);