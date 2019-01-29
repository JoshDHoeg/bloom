// BLOOMTIME DESIGN 2019
import React from 'react';

//IMPORT CONTAINERS
import { PasswordForgetForm } from '../Users/PasswordForget';
import PasswordChangeForm from '../Users/PasswordChange';

//IMPORT UTILITIES
import { AuthUserContext, withAuthorization } from '../../utilities/Session';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
