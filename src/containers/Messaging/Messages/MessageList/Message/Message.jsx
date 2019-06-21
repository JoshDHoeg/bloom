import React from 'react';
import { Comment, Segment } from "semantic-ui-react";
import moment from 'moment';
import '../../../Messaging.scss'

const timeFromNow = timestamp => {
    var m = moment.unix(timestamp.seconds);
    return m.fromNow();
}

class Message extends React.Component {
    render(){
        return (
               <Comment>
                <Comment.Content collapsed>
                    <Comment.Author as="a"> {this.props.message.from} </Comment.Author>
                    <Comment.Metadata> {timeFromNow(this.props.message.time)} </Comment.Metadata>
                    <Comment.Text> {this.props.message.content} </Comment.Text>
                </Comment.Content>
            </Comment>
        );
    }
}

export default Message;
