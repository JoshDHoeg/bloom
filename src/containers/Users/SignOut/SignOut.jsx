// BLOOMTIME DESIGN 2019
import React from 'react';
import { Button, Icon } from 'semantic-ui-react'
//IMPORT UTILITIES
import {  NavLink } from 'react-router-dom';
import { withFirebase } from '../../../utilities/Firebase';
// import * as ROUTES from '../../../utilities/constants/routes';

const SignOutButton = ({ firebase }) => (
    <Button animated onClick={firebase.doSignOut}>
    <Button.Content visible>Sign Out</Button.Content>
    <Button.Content hidden>
      <Icon name='arrow right' />
    </Button.Content>
    </Button>
);

export default withFirebase(SignOutButton);
