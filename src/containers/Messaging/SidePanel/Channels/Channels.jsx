import React from "react";

import { Menu, Icon,Item,Dropdown } from "semantic-ui-react";

class Channels extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      channels: []
    };
  }

  setChannelState() {
      this.setState({
          channels: this.props.channels
      });
  }

  componentWillMount(){
    this.setChannelState();
  }

  //highlight active channel with blue
  displayChannels = channels =>
      channels.length > 0 &&
      channels.map((channel, index) => {
        if(channel.id === this.props.currentChannel.id) {
            return (
                <Menu.Item
                    fitted='vertically'
                    key={channel.id}
                    onClick={() => {this.props.setCurrentChannel(channel, index)}}
                    name={channel.name}
                    style={{opacity: 0.95, backgroundColor: '#4d94ff'}}
                >
                    # {channel.name}
                </Menu.Item>
            )
        }else {
          return (
              <Menu.Item
                  fitted='vertically'
                  key={channel.id}
                  onClick={() => {this.props.setCurrentChannel(channel, index)}}
                  count = {this.props.newMessageCounts[index]}
                  name={channel.name}
                  style={{opacity: 0.95}}
              >
                  # {channel.name}
                  {this.displayNotifications(this.props.newMessageCounts[index])}

              </Menu.Item>
          )
        }

      });

  displayNotifications = count =>  {
      if (count > 0) {
         return(
             <Notification count={count}> </Notification>
         )
      }
  }

  render() {
    const { channels } = this.state;

    return (
      <React.Fragment>
            <Dropdown
            button
            className='icon'
            floating
            labeled
            options={this.displayChannels(channels)}
            text='Select Channel'
          />
      </React.Fragment>
    );
  }
}

const Notification = props => {
    console.log(props);
    return (props.count !== 0 &&
        <div class="ui red circular label"> {props.count}</div>
    )
}

export default Channels;
