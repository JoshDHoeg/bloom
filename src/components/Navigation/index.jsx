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
    <div className="ui purple inverted top menu">
        <div className="ui purple inverted top menu fixed">
            <div className="item">
                <Link to={ROUTES.CLIENT_BRIEF}>Project</Link>
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
            <div className="right menu item">
                <h3>Bloomtime </h3>
            </div>
        </div>
    </div>
);

const NavigationNonAuth = () => (
    <div className="ui purple inverted  top menu">
        <div className="ui purple inverted  top menu fixed">
            <div className="item">
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </div>
            <div className="item">
                <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </div>
            <div className="right menu item">
                <h3>Bloomtime </h3>
            </div>
        </div>
    </div>
);

export default Navigation;
