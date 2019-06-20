// BLOOMTIME DESIGN 2019
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar,Button} from 'semantic-ui-react';
//MATERIAL UI IMPORTS
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import MessageIcon from '@material-ui/icons/Message';
import Popover from '@material-ui/core/Popover';
import AccountInfoPage from './components/AccountInfo/AccountInfo'
import Typography from '@material-ui/core/Typography';
//IMPORT CONTAINERS
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



function Account() {

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
  
      <Router>
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
                  </div>
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
              </Segment>
    </Router>
    

    );}
     const condition = role => role > 0;
export default withAuthorization(condition)(Account)

