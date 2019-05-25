import React from 'react';

//IMPROT UTILITIES
import { withAuthorization } from '../../../utilities/Session';

class UserProject extends React.Component {
    render(){
        return(
            <div> This is the user proj component </div>
        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(UserProject);
