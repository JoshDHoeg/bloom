import React from "react";
import { Menu, Icon } from "semantic-ui-react";

class Channels extends React.Component {
  state = {
    channels: []
  };
  channels = this.props.channel;
  
  render() {
    const { channels } = this.state;
    console.log("This is the test state");
    console.log(this.props.channel);

    return (
      <Menu compact style={{background:'#4c3c4c',marginTop: "50px"}}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{" "}
          {channels.length} <Icon name="add" />
        </Menu.Item>
        {/* Channels */}
      </Menu>
    );
  }
}

export default Channels;
