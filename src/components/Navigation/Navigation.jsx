//BLOOMTIME DESIGN 2019

import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import NavigationToggle from './NavigationToggle/NavigationToggle'
import logo from '../../Images/BloomtimeLogo.png'
//IMPORT UTILITIES
import * as ROUTES from '../../utilities/constants/routes';
// import * as ROLES from "../../utilities/constants/roles";
import { AuthUserContext } from '../../utilities/Session';

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {   authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
);


class NavigationAuth extends Component {
    render(){
        return(
        <div>
            <NavigationToggle/>
        </div>
        )
    }
}

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


export default (Navigation);
