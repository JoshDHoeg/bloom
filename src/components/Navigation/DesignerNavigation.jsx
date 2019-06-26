// BLOOMTIME DESIGN 2019
import React, {Component} from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../Images/TempLogo.JPG'
//IMPORT UTILITIES
import * as ROUTES from '../../utilities/constants/routes';
// import * as ROLES from "../../utilities/constants/roles";
import { AuthUserContext } from '../../utilities/Session';
import SignOutButton from '../../containers/Users/SignOut/SignOut'
import Loading from '../Loading/Loading'
import { Dropdown, Menu, Button, Image, Icon, DropdownItem, Sticky, Sidebar } from 'semantic-ui-react';

class DesignerNavigation extends Component {
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
    <div >
    <Sticky>
        <Menu style={{zIndex: 100000}}>
            <Dropdown className='ui labeled icon' item icon = 'unordered list'>
                <Dropdown.Menu>
                    <NavLink color='teal' to='/account/info'>
                        <DropdownItem>
                            <Button><Icon name='user'/>Account</Button>
                        </DropdownItem>
                    </NavLink>
                    <NavLink color='teal' to={ROUTES.PROJECT_LIST}>
                        <DropdownItem>
                            <Button><Icon name='file alternate'/>Projects</Button>
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
                    <Image src={logo} alt="bloomtime-logo" size='mini'/>
                </NavLink>
            </Menu.Item>
        </Menu>
    </Sticky>
</div>
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
        </Menu.Item>
    </Menu>
);

export default DesignerNavigation;

//             <Sidebar.Pushable as={Segment} style={{ marginTop: "-9px", marginLeft: '-3px', minHeight: "290px" }}>
//                 <Router>
//                     <div>
//                         {/* <Sidebar as={Menu} icon='labeled' vertical visible width='thin'>
//                             {/*Gotta center this*/}
//                             <div style={{ paddingLeft: "50px", paddingTop: "25px", paddingBottom: "30px" }}>
//                                 <img className="ui small circular image" src="https://react.semantic-ui.com/images/avatar/large/matthew.png" alt="" style={{ height: "55px", width: "55px" }} />
//                             </div>
//                             <Menu.Item as={Link} to={ROUTES.CLIENT_BRIEF}>
//                                 <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
//                                     <Icon name='clipboard' />
//                                     DBrief
//                                 </div>
//                             </Menu.Item>
//                             <Menu.Item as={Link} to={ROUTES.CLIENT_CONCEPT}>
//                                 <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
//                                     <Icon name='bullseye' />
//                                     Concept
//                                 </div>
//                             </Menu.Item>
//                             <Menu.Item as={Link} to={ROUTES.CLIENT_DRAFT}>
//                                 <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
//                                     <Icon name='file' />
//                                     Draft
//                                 </div>
//                             </Menu.Item>
//                             <Menu.Item as={Link} to={ROUTES.CLIENT_FINAL}>
//                                 <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
//                                     <Icon name='file' />
//                                     Final
//                                 </div>
//                             </Menu.Item>
//                             <Menu.Item as={Link} to={ROUTES.CLIENT_REVISIONS}>
//                                 <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
//                                     <Icon name='folder' />
//                                     Revisions
//                                 </div>
//                             </Menu.Item>
//                         </Sidebar>