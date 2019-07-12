//BLOOMTIME DESIGN 2019

import React, {Component} from 'react';
import { Link, NavLink } from 'react-router-dom';
import NavigationToggle from './NavigationToggle/NavigationToggle'
import logo from '../../Images/TempLogo.JPG'
//IMPORT UTILITIES
import * as ROUTES from '../../utilities/constants/routes';
// import * as ROLES from "../../utilities/constants/roles";
import { AuthUserContext } from '../../utilities/Session';
import Loading from '../Loading/Loading'
import { Menu } from 'semantic-ui-react'

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.setState({ loading: false })
    }

    render(){
        if(this.state.loading){
            return <Loading/>
        }else if(!this.state.loading){
            return(
                <div>
                <AuthUserContext.Consumer>
                    {   authUser =>
                        authUser ? <NavigationAuth /> : <NavigationNonAuth />
                    }
                </AuthUserContext.Consumer>
                </div> 
            )
        }
    }
}


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
    <Menu>
        <NavLink to='/signin'>
            <Menu.Item>
                Sign In
            </Menu.Item>
        </NavLink>
        <NavLink to='/signup'>
            <Menu.Item>
                Sign Up
            </Menu.Item>
        </NavLink>
        <Menu.Item className="right menu item">
             <img src={logo} alt="bloomtime-logo"/>
        </Menu.Item >
    </Menu>
);


export default (Navigation);
