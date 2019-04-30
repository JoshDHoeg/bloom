import React from 'react';
import { withAuthorization } from '../../utilities/Session';
import { Segment , Comment } from "semantic-ui-react";
// import MessagesHeader from "./MessagesHeader";
// import MessageForm from "./MessageForm";
// import Message from "./Message";

class Messages extends React.Component {
    render(){
        return (
            <React.Fragment>
                {/*<MessagesHeader />*/}
                {/*<Segment>*/}
                    {/*<Comment.Group className="messages">*/}
                        {/*{this.displayMessages(messages)}*/}
                    {/*</Comment.Group>*/}
                {/*</Segment>*/}
                {/*<MessageForm*/}
                    {/*messagesRef={messagesRef} currentChannel={channel} currentUser={user}*/}
                {/*/>*/}
            </React.Fragment>

        )
    }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(Messages);
