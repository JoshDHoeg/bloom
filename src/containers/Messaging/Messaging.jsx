import React,{Component} from 'react';
import { withAuthorization } from '../../utilities/Session';

import { Grid ,Sidebar, Segment , Comment, GridColumn,Menu } from "semantic-ui-react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import backgroundTemp from '../../Images/TempBackground.PNG';
import * as ROUTES from "../../utilities/constants/routes";
import Messages from './Messages/MessageList/Message/Message';
import SidePanel from './SidePanel/SidePanel';
class Messaging extends Component {
    render(){
        this.props.firebase.doCreateAndAddMessageInChannel("Josh", "hello", this.props.firebase.user.helpChannel);
            //.then(m => {
                this.props.firebase.doGetMessagesByChannel(this.props.firebase.user.helpChannel).then(res=>{console.log(res)});
           

     return(

      <Grid columns="equal" style={{ background: "#eee",height: '100vh'}}>
      <SidePanel />

      <Grid.Column >
        <Messages />
      </Grid.Column>
    </Grid>
     )


    }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(Messaging);
