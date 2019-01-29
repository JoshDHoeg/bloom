// BLOOMTIME DESIGN 2019
import React from 'react';

//IMPROT UTILITIES
import { withAuthorization } from '../../utilities/Session';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
