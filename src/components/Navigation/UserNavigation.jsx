// BLOOMTIME DESIGN 2019
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Images/TempLogo.JPG'
import {Menu, Dropdown, Image, Icon} from 'semantic-ui-react'
//IMPORT UTILITIES
import * as ROUTES from '../../utilities/constants/routes';
// import * as ROLES from "../../utilities/constants/roles";
import { AuthUserContext } from '../../utilities/Session';
import SignOutButton from '../../containers/Users/SignOut/SignOut'
import { DropdownItem } from 'semantic-ui-react';

const UserNavigation = () => (
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
    <Menu >
        <Dropdown className='ui labeled icon' item icon = 'unordered list'>
            <Dropdown.Menu>
                <DropdownItem>
                    <Icon name = 'user'/>
                    <Link to={ROUTES.ACCOUNT_INFO}>Account</Link>
                </DropdownItem>
                <Dropdown.Item>
                    <Icon name='file alternate'/>
                    <Link to={ROUTES.PROJECT_LIST}>Projects</Link>
                </Dropdown.Item>
                <DropdownItem>
                    <Icon name='comments'/>
                    <Link to={ROUTES.MESSAGING}>Messages</Link>
                </DropdownItem>
                <DropdownItem>
                    <SignOutButton/>
                </DropdownItem>
            </Dropdown.Menu>
        </Dropdown>
        <Menu.Item className='right menu item'>
            <Image src={logo} alt="bloomtime-logo" size='mini'/>
        </Menu.Item>
    </Menu>
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
)

export default UserNavigation;