import React from "react";
import Message from './Message/Message';

class Messages extends React.Component {
    render() {
        if (this.props.searchTerm){
            return (
                this.props.messages.length > 0 && this.props.searchResults.map(message => (
                    <Message
                        key={message.id}
                        message={message}
                    />
                ))
            )
        }else{
            return (this.props.messages.length > 0 && this.props.messages.map(message => (
                    <Message
                        key={message.id}
                        message={message}
                    />
                ))
            )
        }
    }
}
export default Messages;
