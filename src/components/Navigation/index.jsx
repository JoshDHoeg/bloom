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
    <div className="ui stackable menu">
        <div className="item">
            <Link to={ROUTES.CLIENT_CONCEPT}>Project</Link>
        </div>
        <div className="item">
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </div>
        <div className="item">
            <Link to={ROUTES.DESIGNER}>Designer</Link>
        </div>
        <div className="item">
            <SignOutButton />
        </div>
    </div>
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
