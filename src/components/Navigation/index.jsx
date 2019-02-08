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
    //Not sure why, but changing the class twice stops the overlap ¯\_(ツ)_/¯
    <div class="ui grey inverted top menu">
        <div class="ui grey inverted top menu fixed">
            <div class="item">
                <Link to={ROUTES.CLIENT_CONCEPT}>Project</Link>
            </div>
            <div class="item">
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </div>
            <div class="item">
                <Link to={ROUTES.DESIGNER}>Designer</Link>
            </div>
            <div class="item">
                <SignOutButton />
            </div>
            <div class="right menu item">
                <text>Bloomtime </text>
            </div>
        </div>
    </div>
);

const NavigationNonAuth = () => (
    <div class="ui inverted top menu">
        <div class="ui inverted top menu fixed">
            <div class="item">
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </div>
            <div class="item">
                <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </div>
            <div class="right menu item">
                <text>Bloomtime </text>
            </div>
        </div>
    </div>
);

export default Navigation;
