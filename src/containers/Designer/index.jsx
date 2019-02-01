// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//IMPORT UTILITIES
import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../utilities/Session';
import { format } from 'path';

class AdminPage extends Component {
  unSub;
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    // TODO: we might be able to move this to the firebaes but idk if thats possible without observables
    this.unSub = this.props.firebase.users().onSnapshot(userQuery => {
      const usersList = userQuery.docs.map(user => ({
        ...user.data(),
        uid: user.ref.id,
      }));
      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.unSub();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>

          {loading && <div>Loading ...</div>}

          <UserList users={users} />

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
          <strong>Username:</strong> {user.name}
        </span>
      </li>
    ))}
  </ul>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(AdminPage);
