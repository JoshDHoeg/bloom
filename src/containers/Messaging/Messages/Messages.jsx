import React from "react";
import { Segment, Comment,Button,Icon } from "semantic-ui-react";

import MessagesHeader from "./Header/Header";
import MessageForm from "./Form/Form";
import MessageList from "./MessageList/MessageList";


class Messages extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: this.props.loading,
            currentChannel: this.props.currentChannel,
            name: this.props.currentChannel.name,
            searchTerm: "",
            searchLoading: false,
            searchResults: [],
            channels: this.props.channels
        };
        //this.addMessage = this.addMessage.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }

    handleSearchChange = event => {
        this.setState({
            searchTerm: event.target.value,
            searchLoading: true
        }, () => this.handleSearchMessages());
    }

    handleSearchMessages = () => {
        const channelMessages = this.state.messages;
        const regex = new RegExp(this.state.searchTerm, "gi");
        const searchResults = channelMessages.reduce((acc, message) => {
            if(message.content && message.content.match(regex)) {
                acc.push(message);
            }
            return acc;
        }, []);
        this.setState({
            searchResults: searchResults
        });
    }
    render() {

        if(!this.state.loading){
            return (
                <React.Fragment>
                    <MessagesHeader
                        newMessageCounts={this.props.newMessageCounts}
                        currentChannel={this.props.currentChannel}
                        channels={this.state.channels}
                        setCurrentChannel={this.props.setCurrentChannel}
                    />
                    <Segment  className="messages" >
                        <Comment.Group>
                            <MessageList searchTerm={this.state.searchTerm} searchResults={this.state.searchResults} messages={this.props.messages}/>
                        </Comment.Group>
                    </Segment>
                    <MessageForm
                        currentChannel={this.props.currentChannel}
                        name={this.props.firebase.user.name}
                        addMessage={this.props.addMessage}
                    />
                </React.Fragment>
            );
        }
        else {
            return (
                <div>Loading</div>
            );
        }
    }
}

export default Messages;
