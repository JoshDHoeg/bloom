// BLOOMTIME DESIGN 2019
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Images/TempLogo.JPG'
import {Menu, Dropdown, Image, Icon, Button} from 'semantic-ui-react'
//IMPORT UTILITIES
import * as ROUTES from '../../utilities/constants/routes';
// import * as ROLES from "../../utilities/constants/roles";
import { AuthUserContext } from '../../utilities/Session';
import SignOutButton from '../../containers/Users/SignOut/SignOut'
import { DropdownItem } from 'semantic-ui-react';
import Loading from '../Loading/Loading'

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

const NavigationAuth = () => (
    //Not sure why, but changing the class twice stops the overlap ¯\_(ツ)_/¯
    <Menu >
        <Dropdown className='ui labeled icon' item icon = 'unordered list'>
            <Dropdown.Menu>
                <DropdownItem>
                    <Button><Link to={ROUTES.ACCOUNT_INFO}><Icon name = 'user'/>Account</Link></Button>
                </DropdownItem>
                <Dropdown.Item>
                <Button> <Link to={ROUTES.PROJECT_LIST}><Icon name='file alternate'/>Projects</Link> </Button>
                </Dropdown.Item>
                <DropdownItem>
                <Button> <Link to={ROUTES.MESSAGING}><Icon name='comments'/>Message</Link></Button>
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