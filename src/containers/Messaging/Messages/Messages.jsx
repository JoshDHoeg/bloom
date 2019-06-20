import React from "react";
import { Segment, Comment,Button,Icon } from "semantic-ui-react";

import MessagesHeader from "./Header/Header";
import MessageForm from "./Form/Form";
import MessageList from "./MessageList/MessageList";


class Messages extends React.Component {
    constructor(props){
        super(props);
        console.log("constructor called" , props);
        console.log("")
        this.state = {
            loading: false,
            currentChannel: this.props.currentChannel, //this will change ...help Channel id: b6....
            name: this.props.currentChannel.name,
            messages: this.props.messages,
            searchTerm: "",
            searchLoading: false,
            searchResults: [],
            channels: this.props.channels
        };
        this.addMessage = this.addMessage.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }

    getMessagesOfCurrentChannel = async () => {
        console.log("getting messages of" , this.state.currentChannel.name);
        const m = await this.props.firebase.doGetMessagesByChannel(this.state.currentChannel.id);
        this.setState({
            messages: m,
            loading: false,
        });
    }


    addMessage = async (from, content, channelRef) => {
        const m = await this.props.firebase.doCreateAndAddMessageInChannel(from, content, channelRef);
        const temp = this.state.messages;
        temp.push(m);
        this.setState({
            messages: temp
        });
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

    componentWillMount() {
      this.getMessagesOfCurrentChannel();
    }

    componentDidUpdate(prevProps){
        if(this.props.currentChannel.id !== prevProps.currentChannel.id){
            this.setState({
                currentChannel: this.props.currentChannel,
                name: this.props.currentChannel.name,
                loading: true,
            }, () => this.getMessagesOfCurrentChannel());
        }
    }
   
    render() {
        if(!this.state.loading){
            return (
                <React.Fragment>
                    <MessagesHeader 
                    handleSearchChange={this.handleSearchChange} 
                    currentChannel={this.props.currentChannel} 
                    channels={this.state.channels}
                    setCurrentChannel={this.props.setCurrentChannel}
                    />
                    <Segment  className="messages" >
                        <Comment.Group>
                            <MessageList searchTerm={this.state.searchTerm} searchResults={this.state.searchResults} messages={this.state.messages}/>
                        </Comment.Group>
                    </Segment>
                    <MessageForm
                        currentChannel={this.state.currentChannel}
                        name={this.props.firebase.user.name}
                        addMessage={this.addMessage}
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
