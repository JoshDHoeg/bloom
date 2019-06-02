// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import WaitingPage from '../../../../components/Waiting/Waiting';
import CompletedPage1 from './Completed1/Completed';
import * as ROUTES from "../../../../utilities/constants/routes";


class Revision extends React.Component{
    revision;
    stage;
    constructor(props) {
        super(props);
        this.state = {
            revision: {
                completed: false,
                figma: 'https://www.figma.com/file/ggEHJtusFHITsrjRhvjtJZY5/Bloomtime-Platform-v2?node-id=0%3A1',
            },
            stage: {
                stage: ''
            }
        };
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
            return( <CompletedPage1 stage={this.state.stage}/> );
        }
    }
}

const condition = role => role > 0;

export default withAuthorization(condition)(Revision);