import React, {Component} from 'react'
import UserPanel from "../SidePanel/UserPanel/UserPanel";
import { Menu } from "semantic-ui-react";
import Channels from "./Channels/Channels";
import { withAuthorization } from '../../../utilities/Session';


class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loading: true,
      name: this.props.firebase.user.name,
      channels: this.props.channels
    };
  }

  // componentWillMount(){
  //   this.getUserState();
  // }

  // getUserState = async () => {
  //   const user = this.props.firebase.user;
  //   const channels = await this.props.firebase.doGetChannelsByUser(user.id);
  //   const state = {
  //       loading: false,
  //       name: user.name,
  //       channels: channels
  //   };
  //   this.setState(state);
  // }

  render() {
    return (
        <Menu
            size="large"
            inverted
            float="left"
            vertical
            style={{background: "#4c3c4c", fontSize: "1.2rem"}}
        >
            <UserPanel user={this.state}/>
            <Channels
                channels={this.state.channels}
                currentChannel={this.props.currentChannel}
                setCurrentChannel={this.props.setCurrentChannel}
            />
        </Menu>
    );
  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(SidePanel);
