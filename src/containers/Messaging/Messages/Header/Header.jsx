import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";
import Channels from '../../SidePanel/Channels/Channels';
import { withAuthorization } from '../../../../utilities/Session';

class MessagesHeader extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentChannel: this.props.currentChannel, 
      channels: this.props.channels,
    }
  }

  render() {
      const { handleSearchChange } = this.props;
    return (
      <Segment clearing fluid>
        {/* Channel Title */}
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
              {this.props.currentChannel.name}
          </span>
        </Header>
        <Channels
                channels={this.state.channels}
                currentChannel={this.state.currentChannel}
                setCurrentChannel={this.props.setCurrentChannel}
            />
      </Segment>
    );
  }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(MessagesHeader);

/* 
<Header floated="right">
<Input
  onChange={handleSearchChange}
  size="mini"
  icon="search"
  name="searchTerm"
  placeholder="Search Messages"
/>
</Header>*/