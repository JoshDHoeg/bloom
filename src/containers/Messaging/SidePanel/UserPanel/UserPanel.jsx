import React from "react";
import { Menu,Grid, Header, Icon } from "semantic-ui-react";

const UserPanel =(props) => {
  const username = props.user.name
  
   return(
   <Menu.Menu style={{ background: "#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <img alt="profile-icon" src="https://react.semantic-ui.com/images/avatar/large/matthew.png"style={{ height: "55px", width: "55px" }} />
              <Header.Content>{username}</Header.Content>
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Menu.Menu>
    )
   }
export default UserPanel;