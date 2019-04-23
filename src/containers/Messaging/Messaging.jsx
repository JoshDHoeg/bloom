import React from 'react';
import { withAuthorization } from '../../utilities/Session';
import { Segment , Comment } from "semantic-ui-react";

class Messaging extends React.Component {
    render(){
        console.log(this.props);
        return (
            <div>Messaging</div>

        )
    }
}



const condition = authUser => !!authUser;
export default withAuthorization(condition)(Messaging);
