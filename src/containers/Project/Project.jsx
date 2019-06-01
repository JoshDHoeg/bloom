// BLOOMTIME DESIGN 2019
import React from 'react';

//IMPROT UTILITIES
import { withAuthorization } from '../../utilities/Session';
import * as ROUTES from "../../utilities/constants/routes";
import HomePageWithSidebar from './DesignerProject/DesignerProject';
import { UserProjectAuth } from './UserProject/UserProject';


class ProjectBase extends React.Component {
    render(){
        if(this.props.firebase.user._isDesigner){
            return <HomePageWithSidebar/>
        }
        else {
            console.log("here");
            return <UserProjectAuth/>
        }
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProjectBase);
