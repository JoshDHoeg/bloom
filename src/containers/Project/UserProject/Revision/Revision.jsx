// BLOOMTIME DESIGN 2019
import React from 'react';
//IMPROT UTILITIES
import { withAuthorization } from '../../../../utilities/Session';
import Waiting from '../../../../components/Waiting/Waiting';
import Completed from './Completed/Completed';


class Revision extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            completed: true,
            figma: 'https://www.figma.com/file/ggEHJtusFHITsrjRhvjtJZY5/Bloomtime-Platform-v2?node-id=0%3A1',
        };
    //Change state in the future 
      }

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

export default withAuthorization(condition)(Revision);