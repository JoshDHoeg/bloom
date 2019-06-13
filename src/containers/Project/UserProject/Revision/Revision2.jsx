// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import WaitingPage from '../../../../components/Waiting/Waiting';
import CompletedPage2 from './Completed2/Completed';
import * as ROUTES from "../../../../utilities/constants/routes";


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
                approved: false
            },
            stage: {
                stage: ''
            }
        };
        this.formSubmit = this.formSubmit.bind(this);
      }

    formSubmit = () => {
        this.stage.stage = 'contractors'
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
                ...this.revision.getAll()
            },
            stage: {
                stage: this.stage.stage
            }
        }

        this.setState(state);
        return state;
    }
    render(){
        if(!this.state.revision.completed){
            return( <WaitingPage state="revision"/> );             
        } else {
            return( <CompletedPage2 formSubmit={this.formSubmit} revision={this.state.revision} stage={this.state.stage}/> );
        }
    }
}

const condition = role => role > 0;

export default withAuthorization(condition)(Revision);