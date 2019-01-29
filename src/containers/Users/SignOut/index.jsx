// BLOOMTIME DESIGN 2019
import React from 'react';

//IMPORT UTILITIES
import { withFirebase } from '../../../utilities/Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
