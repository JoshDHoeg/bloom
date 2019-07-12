// BLOOMTIME DESIGN 2019
import React from 'react';
import {Sticky} from 'semantic-ui-react'
//IMPROT UTILITIES
import { withAuthorization } from '../../utilities/Session'; //user authorization check
import * as ROUTES from "../../utilities/constants/routes"; //routes list
import HomePageWithSidebar from './DesignerProject/DesignerProject'; //designer UI stuff
import UserProject from './UserProject/UserProject'; //user UI stuff


class ProjectBase extends React.Component {
    render(){
        if(this.props.firebase.user._isDesigner){ //if the user is a designer, loads designer UI
            return <HomePageWithSidebar/>
        }
        else { //if not designer, user is client, load client UI
            return <UserProject/>
        }
    }
}


const condition = role => role > 0; //if user has role assigned greater than needed value (0), returns true

export default withAuthorization(condition)(ProjectBase); //if condition is true, authorizes and exports
