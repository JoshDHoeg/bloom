import React from 'react';
import { withAuthorization } from '../../utilities/Session';

import { Grid ,Sidebar, Segment , Comment, GridColumn } from "semantic-ui-react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import backgroundTemp from '../../Images/TempBackground.PNG';
import * as ROUTES from "../../utilities/constants/routes";
import UserPanel from './SidePanel/UserPanel/UserPanel';
import Messages from './Messages/MessageList/Message/Message';


class Messaging extends React.Component {
 
    render(){
     return(
        <Grid columns = "equal" className= "Messaging" style={{ marginTop: "-9px", marginLeft: '-3px', marginRight: '3px', minHeight: "100vh" }}>
          <UserPanel/> 
        }
       </Grid>
     )


    }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(Messaging);
