// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import Waiting from '../../../../components/Waiting/Waiting';
import Completed from './Completed/Completed.jsx';


class Final extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            completed: true,
            figma: '',
        }
        };
    
        doSetProject = async () => {
            this.project = await this.props.firebase.doGetProject(this.props.firebase.user.uid, this.props.firebase.activeProject, true);
            //const completed = await this.project.concept.completed;
            const approved = await this.project.concept.approved;
            const figma = await this.project.final.figma;
            this.setState({
                //completed: completed,
                approved: approved,
                figma: figma
            });
        };

        componentWillMount(){
            this.doSetProject();
       };


    render(){
        if(this.state.completed)
        {
        return(
            <Completed figma = {this.state.figma}/>);
        }
        else
        {
        return( 
            <Waiting/>
            );             
        }
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Final);