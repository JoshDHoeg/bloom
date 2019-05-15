import React from "react";
import { Menu, Icon,Item } from "semantic-ui-react";

class Channels extends React.Component {
state = {
      channels:[],
    };
  
pushValue()
{
  if(this.props.channel!=undefined){
    console.log(this.props.channel)
    this.state.channels = this.props.channel;
  }
 
}
 
  displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        fitted='vertically'
        key={channel.id}
        onClick={() => console.log(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
      >
        # {channel.name}
      </Menu.Item>
    ));

  render() {
    {this.pushValue()};
    const { channels } = this.state;
    return (


      <React.Fragment>
      <Menu.Menu style={{background:'#4c3c4c',marginTop: "50px"}}>
        <Menu.Item >
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{" "}
        </Menu.Item>

        {this.displayChannels(channels)}
        </Menu.Menu>
        </React.Fragment>
    );
  }
}

export default Channels;
