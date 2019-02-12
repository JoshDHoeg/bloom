// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../utilities/Session';
import { format } from 'path';
import {Link} from "react-router-dom";
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import * as ROUTES from "../../utilities/constants/routes";
import { Designer } from "./designer"

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    //temp dummy data
    var temp = [
            {pic: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
            name: "Jack",
            loc: "Denver",
            status: "Ongoing"},

            {pic: 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg',
            name: "Jim",
            loc: "Denver",
            status: "Ongoing"},

            {pic: 'https://react.semantic-ui.com/images/avatar/large/molly.png',
            name: "Molly",
            loc: "Greeley",
            status: "Completed"}]
      
    return (
        <div>
            <Sidebar.Pushable as={Segment}>
                <Sidebar as={Menu} icon='labeled' inverted vertical visible width='thin'>
                    <Menu.Item as={Link} to={ROUTES.CLIENTS}>
                        <Icon name='address book' />
                        Clients
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher>
                    <Segment basic>
                        <div>
                            <h1>Clients</h1>
                            {loading && <div>Loading ...</div>}
                            <UserList users={users} />
                            <Designer props={temp}/>
                        </div>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(AdminPage);
