import React, {Component} from 'react';
//MATERIAL UI IMPORTS
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import MessageIcon from '@material-ui/icons/Message';
import Popover from '@material-ui/core/Popover';
import Messaging from './Messaging';
import Badge from '@material-ui/core/Badge';
import { withAuthorization } from '../../utilities/Session';
import * as ROUTES from "../../utilities/constants/routes";
import backgroundTemp from '../../Images/TempBackground.PNG';
import { Visibility } from 'semantic-ui-react';

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


function PopMessage() 
{
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [invisible, setInvisible] = React.useState(false);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
    handleBadgeVisibility();
  }

  function handleClose() {
    setAnchorEl(null);
  }
  function handleBadgeVisibility() {
    if(!invisible){
    setInvisible(!invisible);}
    else{}
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : null;
  return(
    <div> 
    <Fab color="primary" className={useStyles().fab} onClick = {handleClick}>
    <Badge  badgeContent={4} color="secondary" invisible={invisible} >
          <MessageIcon />
    </Badge>
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
  )

}
export default (PopMessage)