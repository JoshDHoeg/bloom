// BLOOMTIME DESIGN 2019
import React, {Component} from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../Images/TempLogo.JPG'
import {Menu, Dropdown, Image, Icon, Button, Sticky} from 'semantic-ui-react'
//IMPORT UTILITIES
import * as ROUTES from '../../utilities/constants/routes';
// import * as ROLES from "../../utilities/constants/roles";
import { AuthUserContext } from '../../utilities/Session';
import SignOutButton from '../../containers/Users/SignOut/SignOut'
import { DropdownItem } from 'semantic-ui-react';
import Loading from '../Loading/Loading'
import { withFirebase } from '../../utilities/Firebase';

class UserNavigation extends Component {
    concept;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
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
                        authUser ? <NavigationAuth handleNav={this.handleNav}/> : <NavigationNonAuth />
                    }
                </AuthUserContext.Consumer>
                </div> 
            )
        }
    }
}

class NavigationAuth extends Component {

    render(){
        return (
        <Sticky>
            <Menu>
<<<<<<< HEAD
                <Dropdown className='ui labeled icon' item icon = 'unordered list'>
                    <Dropdown.Menu>
                        <NavLink color='teal' to='/account/info'>
                            <DropdownItem className='title' >
                                <Button><Icon name = 'user'/>Account</Button>
                            </DropdownItem>
                        </NavLink>
                        <NavLink color='teal' to={ROUTES.PROJECT}>
                            <DropdownItem className='title' >
                                <Button><Icon name = 'file alternate'/>Projects</Button>
                            </DropdownItem>
                        </NavLink>
                        <NavLink color='teal' to='/user_payment'>
                            <DropdownItem className='title' >
                                <Button><Icon name = 'credit card'/>Pay Now</Button>
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
                    <NavLink to='/project/'>
=======
                <Menu.Item name='Project' icon='file alternate' href={ROUTES.PROJECT}/>
                <Menu.Item name='Account' icon='user' href='/account/info'/>
                <Menu.Item name='Payment' icon='credit card' href='/user_payment'/>
                <Menu.Item className='right menu item'>
                    <NavLink to='/'>
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
                        <Image src={logo} alt="bloomtime-logo" size='mini'/>
                    </NavLink>
                </Menu.Item>
            </Menu>
        </Sticky>
        )
    }
}


const NavigationNonAuth = () => (
    <Sticky>
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
    </Sticky>
)

export default withFirebase(UserNavigation);