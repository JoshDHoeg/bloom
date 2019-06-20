// BLOOMTIME DESIGN 2019
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar,Button} from 'semantic-ui-react';
//MATERIAL UI IMPORTS
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import MessageIcon from '@material-ui/icons/Message';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
//IMPORT CONTAINERS
import SignOutButton from '../Users/SignOut/SignOut';
import PaymentInfoPage from './PaymentOptions/PaymentOptions';
import AccountInfoPage from './AccountInfo/AccountInfo';
import PreferencesPage from './AccountPreferences/AccountPreferences'
//import AccountPreferences from './AccountPreferences';
// import PasswordForgetForm from '../Users/PasswordForget/PasswordForget';
// import PasswordChangeForm from '../Users/PasswordChange/PasswordChange';
import Messaging from '../Messaging/Messaging';
//IMPORT UTILITIES
import { withAuthorization } from '../../utilities/Session';
import * as ROUTES from "../../utilities/constants/routes";
import backgroundTemp from '../../Images/TempBackground.PNG';
const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    position: 'absolute',
    bottom: 20,
    right: 20,
    
  },
  typography: {
    padding: theme.spacing(2),
  },
}));



function AccountPageWithSidebar() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : null;




    return (
  <div style={{ backgroundImage: "url("+ backgroundTemp + ")", backgroundRepeat: 'repeat'}}>
    <Sidebar.Pushable as={Segment} style={{ marginTop: "-9px", marginLeft: '-3px', marginRight: '3px', minHeight: "400px" }}>
      <Router>
        <div>
          <Sidebar as={Menu} icon='labeled' vertical visible width='thin'>
              <div style={{ paddingLeft: "50px", paddingTop: "25px", paddingBottom: "30px" }}>
                <img className="ui small circular image" alt="profile-icon" src="https://react.semantic-ui.com/images/avatar/large/matthew.png" style={{ height: "55px", width: "55px" }} />
              </div>
              <Menu.Item as={Link} to={ROUTES.ACCOUNT_INFO}>
                <div style={{ paddingTop: "10px", paddingBottom: "10px"}}>
                  <Icon className='info circle' />
                  Account Info
                </div>
              </Menu.Item>
              {/* <Menu.Item as={Link} to={ROUTES.ACCOUNT_PREFERENCES}>
                <div style={{ paddingTop: "10px", paddingBottom: "10px"}}>
                 <Icon className='cog' />
                 Preferences
                </div>
              </Menu.Item> */}
              <Menu.Item as= {Link} to={ROUTES.PAYMENT_OPTIONS}>
                <div style={{ paddingTop: "10px", paddingBottom: "10px"}}>
                  <Icon className='money bill alternate outline' />
                  Payment Options
                </div>
             </Menu.Item>
             <Menu.Item>
               <div>
                <SignOutButton />
              </div>
              </Menu.Item>
           </Sidebar>
            <Sidebar.Pusher>
                <Segment basic>
                <div>
                  <Route exact
                    path={ROUTES.ACCOUNT_INFO}
                    render={(props) => <AccountInfoPage {...props} edit={false} /> }
                    />
                  <Route 
                    path={ROUTES.ACCOUNT_INFO_EDIT}
                    render={(props) => <AccountInfoPage {...props} edit={true} /> }
                  />
                  <Route exact
                    path={ROUTES.ACCOUNT_PREFERENCES} 
                    render={(props) => <PreferencesPage {...props} edit={false} /> }
                  />
                  <Route 
                    path={ROUTES.ACCOUNT_PREFERENCES_EDIT} 
                    render={(props) => <PreferencesPage {...props} edit={true} /> }
                  />
                  <Route exact
                  path={ROUTES.PAYMENT_OPTIONS} 
                  render={(props) => <PaymentInfoPage {...props} edit={false} /> }
                  />
                  <Route 
                  path={ROUTES.PAYMENT_OPTIONS_EDIT}
                  render={(props) => <PaymentInfoPage {...props} edit={true} /> }
                  /> 
                </div>
                </Segment>
            </Sidebar.Pusher>
        </div>
      </Router>
    </Sidebar.Pushable>     
          <div> 
    <Fab color="primary" className={useStyles().fab} onClick = {handleClick}>
     <MessageIcon />
    </Fab>
    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 450, left: 1250}}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
      
       <Messaging/>

      </Popover>
               
                </div>

  </div>
    );}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPageWithSidebar);
