// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import WaitingPage from '../../../../components/Waiting/Waiting';
import Completed from './Completed/Completed';


class Revision extends React.Component{
    revision;
    constructor(props) {
        super(props);
        this.state = {
            revision: {
                completed: true,
                figma: 'https://www.figma.com/file/ggEHJtusFHITsrjRhvjtJZY5/Bloomtime-Platform-v2?node-id=0%3A1',
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
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            revision: {
                ...this.revision.getAll()
            }
        }

        this.setState(state);
        return state;
    }
    render(){
        if(this.state.revision.completed)
        {
        return(
            <Completed figma = {this.state.figma}/>);
        }
        else
        {
        return( 
            <WaitingPage state="revision"/>
            );             
        }
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Revision);