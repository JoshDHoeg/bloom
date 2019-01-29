// BLOOMTIME DESIGN 2019
import React from 'react';
import { Link } from 'react-router-dom';

//IMPORT CONTAINERS
import SignOutButton from '../../containers/Users/SignOut';

//IMPORT UTILITIES
import * as ROUTES from '../../utilities/constants/routes';
import { AuthUserContext } from '../../utilities/Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.PROJECT}>Project</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={ROUTES.DESIGNER}>Designer</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </li>
  </ul>
);

export default Navigation;
