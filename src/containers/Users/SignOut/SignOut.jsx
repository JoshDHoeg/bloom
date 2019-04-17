// BLOOMTIME DESIGN 2019
import React from 'react';

//IMPORT UTILITIES
import { withFirebase } from '../../../utilities/Firebase';
// import * as ROUTES from '../../../utilities/constants/routes';

const SignOutButton = ({ firebase }) => (
  <div class='ui animated button' type="button" onClick={firebase.doSignOut}>
    <div class= 'visible content'>
    Sign Out
    </div>
    <div class= 'hidden content'>
      <i class = 'right arrow icon'></i>
    </div>
  </div>
);

export default withFirebase(SignOutButton);
