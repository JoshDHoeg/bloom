import React, {Component} from 'react';
//MATERIAL UI IMPORTS
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import MessageIcon from '@material-ui/icons/Message';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Messaging from './Messaging';
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

function PopMessage() 
{
    const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : null;
  return(
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
  )

}
export default (PopMessage)