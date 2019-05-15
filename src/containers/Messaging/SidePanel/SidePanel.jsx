import React, {Component} from 'react'
import UserPanel from "../SidePanel/UserPanel/UserPanel";
import { Menu } from "semantic-ui-react";
import Channels from "./Channels/Channels";
import { withAuthorization } from '../../../utilities/Session';
class SidePanel extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      name:'',
      channels:[]
    };

}

componentWillMount(){
  this.getUserState();
 }
 
getUserState = async () => {
  const user = this.props.firebase.user;
  const channel = await this.props.firebase.doGetChannelsByUser(user.id);
  console.log(channel);

  //console.log(channel)
  const state = {
      loading: false,
      name: user.name,
      Channels: channel
      
  }
  this.setState(state);
  return state;
}


  render() {
    return (
      <Menu
        size="large"
        inverted
        float="left"
        vertical
        style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
      >
        <UserPanel user = {this.state}/>
        <Channels channel = {this.state.Channels}/>
      </Menu>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(SidePanel);
