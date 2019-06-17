// BLOOMTIME DESIGN 2019
import React, {Component} from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../Images/TempLogo.JPG'
import {Menu, Dropdown, Image, Icon, Button} from 'semantic-ui-react'
//IMPORT UTILITIES
import * as ROUTES from '../../utilities/constants/routes';
// import * as ROLES from "../../utilities/constants/roles";
import { AuthUserContext } from '../../utilities/Session';
import SignOutButton from '../../containers/Users/SignOut/SignOut'
import { DropdownItem } from 'semantic-ui-react';
import Loading from '../Loading/Loading'
import { withFirebase } from '../../utilities/Firebase';

class UserNavigation extends Component {
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

const NavigationAuth = ({firebase}) => (
    //Not sure why, but changing the class twice stops the overlap ¯\_(ツ)_/¯
    <Menu >
        <Dropdown className='ui labeled icon' item icon = 'unordered list'>
            <Dropdown.Menu>
                <NavLink color='teal' to='/account/info'>
                    <DropdownItem className='title' >
                        <Button><Icon name = 'user'/>Account</Button>
                    </DropdownItem>
                </NavLink>
                <NavLink color='teal' to='/'>
                    <DropdownItem className='title' >
                        <Button><Icon name = 'user'/>Projects</Button>
                    </DropdownItem>
                </NavLink>
                <NavLink color='teal' to='/messaging'>
                    <DropdownItem className='title' >
                        <Button><Icon name = 'user'/>Messages</Button>
                    </DropdownItem>
                </NavLink>
                <NavLink color='teal' to='/signin'>
                    <DropdownItem className='title' >
                        <SignOutButton/>
                    </DropdownItem>
                </NavLink>
            </Dropdown.Menu>
        </Dropdown>
        <Menu.Item className='right menu item'>
            <NavLink to='/'>
                <Image src={logo} alt="bloomtime-logo" size='mini'/>
            </NavLink>
        </Menu.Item>
    </Menu>
);

const NavigationNonAuth = () => (
    <Menu>
        <Menu.Item>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </Menu.Item>
        <Menu.Item className="right menu item">
             <img src={logo} alt="bloomtime-logo"/>
        </Menu.Item >
    </Menu>
)

export default withFirebase(UserNavigation);