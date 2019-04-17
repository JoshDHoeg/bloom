// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//IMPROT UTILITIES
import { withAuthorization } from '../../../../../utilities/Session';
// import * as ROUTES from "../../../utilities/constants/routes";

import backgroundTemp from '../../../../../Images/TempBackground.PNG';

import EditButton from '../../../../../components/ProjectBanner/EditButton/EditButton';


class BriefPageWaiting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }
    }
    
    render() {
        return (
            <div style={{textAlign: "center" ,backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat', marginLeft: "-14px", paddingLeft: "14px", paddingBottom: "100vh" }}>
               <h1>The Design Brief Is not ready yet. You will recieve a ntification when it is ready.</h1>
               <EditButton />
            </div>
        );

    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(BriefPageWaiting);
