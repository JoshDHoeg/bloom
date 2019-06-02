// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import WaitingPage from '../../../../components/Waiting/Waiting';
import CompletedPage from './Completed/Completed.jsx';


class Final extends React.Component {
    final;
    stage;
    constructor(props) {
        super(props);
        this.state = {
            final: {
                completed: false,
                figma: '',
            },
            stage: {
                stage: ''
            }
        }
        };
    
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
        this.final = await project.final;
        this.stage = await project.stage
        //const schedule = await this.project.concept.schedule;
        const state = await {
            loading: false,
            final: {
                ...this.final.getAll()
            },
            stage: {
                stage: this.stage.stage
            }
        }
        this.setState(state);
        return state;
    }


    render(){
        if(!this.state.final.completed){
            return( <WaitingPage state="final"/>    );             
        } else {
            return( <CompletedPage stage={this.state.stage} figma={this.state.figma}/> );
        }
    }
}

const condition = role => role > 0

export default withAuthorization(condition)(Final);