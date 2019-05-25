// BLOOMTIME DESIGN 2019
import React from 'react';

//IMPROT UTILITIES
import { withAuthorization } from '../../utilities/Session';
import * as ROUTES from "../../utilities/constants/routes";
import HomePageWithSidebar from './DesignerProject/DesignerProject';
import UserProject from './UserProject/UserProject';


class ProjectBase extends React.Component {
    render(){
        if(this.props.firebase.user._isDesigner){
            return <HomePageWithSidebar/>
        }
        else {
            return <UserProject/>
        }
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProjectBase);
