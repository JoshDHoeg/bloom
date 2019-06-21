import React from "react";
import { Segment, Button, Input } from "semantic-ui-react";

class MessageForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        console.log("handle Submit called")
        this.props.addMessage(this.props.name, this.state.message, this.props.currentChannel.ref);
        this.setState({
            message: ""
        });
        event.preventDefault();
    }

    keyPressed(event){
        if(event.key === "Enter"){
           this.handleSubmit(event);
           event.preventDefault();
        }
    }

    render() {
        return (
          <Segment className="message__form" fluid>
            <Input
                name="message"
                type="text"
                value={this.state.message}
                onKeyPress={this.keyPressed}
                onChange={this.handleChange}
                fluid style={{ marginBottom: "0.7em" }}
                placeholder="Write your message"
            />
              <Button.Group icon widths="2">
              <Button
                onClick={this.handleSubmit}
                color="blue"
                content="Reply"
                labelPosition="left"
                icon="edit"
              />
            </Button.Group>
          </Segment>
        );
    }

}

export default MessageForm;
