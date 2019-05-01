import React from "react";
import { Menu,Grid, Header, Icon, Dropdown } from "semantic-ui-react";


const UserPanel =() => {
   return(
   <Menu size = "large" inverted marginLeft = '-3px' vertical style = {{background:'#4c3c4c',fontSize:'1.2rem'}}>
   <Grid style={{ background: "#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content></Header.Content>
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
   </Menu>
    )
   }
export default UserPanel;