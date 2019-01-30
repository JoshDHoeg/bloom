// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';

//Youtube video and typeform imports
import YoutubeEmbedVideo from "youtube-embed-video";
import { ReactTypeformEmbed } from 'react-typeform-embed';

//IMPORT UTILITIES
import { withFirebase } from '../../utilities/Firebase';
import { withAuthorization } from '../../utilities/Session';
import { format } from 'path';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
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

    return (
      <div>
        <h1>Admin</h1>

          {loading && <div>Loading ...</div>}

          <UserList users={users} />
          <ClientConcept/>
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

const ClientConcept = ({ }) => (
  <ul>
    <YoutubeEmbedVideo videoId="ygggcqKmUts" suggestions={false}/>
    <button type="button"><a href="https://drive.google.com/drive/folders/1H-aSlCfzkodqk8W7JWWv_z8L1GifTZR2?usp=sharing" style={{textDecoration: 'none', color: "black"}}>Google Drive Folder</a></button>
   {/* <ReactTypeformEmbed id="form" popup={true} autoOpen={true} url="https://demo.typeform.com/to/njdbt5" /> */}
  </ul>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AdminPage);
