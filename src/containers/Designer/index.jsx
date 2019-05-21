// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
// import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../utilities/Session';
// import { format } from 'path';
import {Link} from "react-router-dom";
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import * as ROUTES from "../../utilities/constants/routes";
import { Designer } from "./designer"

class AdminPage extends Component {
  userSub;
  projKeyArr;
  userProjs = [];

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: []

    };

    this.projKeyArr = this.props.firebase.user._projects.map(x => x.id);
    this.projKeyArr.forEach(p => this.props.firebase.doGetProject(p).then(res => this.userProjs.push(res)));
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.userSub = this.props.firebase.onUser().subscribe(users => {
      this.setState({
        users: users,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.onUser(this.userSub);
  }

  render() {
    const { users, loading } = this.state;
    console.log(this.userProjs[0]);

    return (
        <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} icon='labeled' vertical visible width='thin'>
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
                            <Designer props={this.userProjs}/>
                        </div>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map((user, i) => (
      <li key={i}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.name}
        </span>
      </li>
    ))}
  </ul>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(AdminPage);
