import React from "react";
import { Menu, Icon,Item } from "semantic-ui-react";

class Channels extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      channels: []
    }
  }

  setChannelState() {
      this.setState({
          channels: this.props.channels
      });
  }

  //can also display channels w/ below function (if not checking loading status in parent component). Think this is worse tho

  // componentDidUpdate(prevProps){
  //   if(prevProps.channels.length !== 0) {
  //       if (this.props.channels[0].name !== prevProps.channels[0].name) {
  //           this.setChannelState();
  //       }
  //   }else{
  //     this.setChannelState();
  //   }
  // }

  componentWillMount(){
    this.setChannelState();
  }

  //highlight active channel with blue
  displayChannels = channels =>
      channels.length > 0 &&
      channels.map((channel) => {
        if(channel.id === this.props.currentChannel.id) {
            return (
                <Menu.Item
                    fitted='vertically'
                    key={channel.id}
                    onClick={() => {this.props.setCurrentChannel(channel)}}
                    name={channel.name}
                    style={{opacity: 0.95, backgroundColor: '#4d94ff'}}
                >
                    # {channel.name}
                </Menu.Item>
            )
        }
        else{
          return (
              <Menu.Item
                  fitted='vertically'
                  key={channel.id}
                  onClick={() => {this.props.setCurrentChannel(channel)}}
                  name={channel.name}
                  style={{opacity: 0.95}}
              >
                  # {channel.name}
              </Menu.Item>
          )
        }

      });

  render() {
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
