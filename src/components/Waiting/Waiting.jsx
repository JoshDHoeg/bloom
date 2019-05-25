import React, {Component} from 'react'
import {withAuthorization} from '../../utilities/Session'

class Waiting extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            edit: false,
            title: 'your stage is not ready yet'
        }
    }
    
    
    render(){
        return(
            <div>{this.state.title}</div>
        );
    }

}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Waiting);