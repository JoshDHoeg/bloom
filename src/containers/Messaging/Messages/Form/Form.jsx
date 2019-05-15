import React from "react";
import { Segment, Button, Input } from "semantic-ui-react";

class MessageForm extends React.Component {
  render() {
    return (
      <Segment className="message__form" fluid>
        <Input
          fluid
          name="message"
          style={{ marginBottom: "0.7em" }}
          placeholder="Write your message"
        />
        <Button.Group icon widths="2">
          <Button
            color="orange"
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
