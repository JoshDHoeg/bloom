// BLOOMTIME DESIGN 2019
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Images/BloomtimeLogo.png'
//IMPORT UTILITIES
import * as ROUTES from '../../utilities/constants/routes';
// import * as ROLES from "../../utilities/constants/roles";
import { AuthUserContext } from '../../utilities/Session';
import SignOutButton from '../../containers/Users/SignOut/SignOut'
const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {   authUser =>
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
                <Link to={ROUTES.PROJECT_LIST}>Projects</Link>
            </div>
            <div className="item">
                <Link to={ROUTES.ACCOUNT_INFO}>Account</Link>
            </div>
            <div className="item">
                <Link to={ROUTES.MESSAGING}>Messages</Link>
            </div>
            <div className="item">
                <SignOutButton/>
            </div>
            <div className="right menu item">
                <img src={logo} alt="bloomtime-logo"/>
            </div>
        </div>
    </div>
);

const NavigationNonAuth = () => (
    <div className="ui purple inverted top menu">
        <div className="ui purple inverted top menu fixed">
            <div className="item">
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </div>
            <div className="item">
                <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </div>
            <div className="right menu item">
                <img src={logo} alt="bloomtime-logo"/>
            </div>
        </div>
    </div>
);

export default Navigation;
