// BLOOMTIME DESIGN 2019
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar,Button} from 'semantic-ui-react';

import AccountInfoPage from './components/AccountInfo/AccountInfo'
import PopMessage from '../Messaging/PopMessage';
//IMPORT CONTAINERS
//import AccountPreferences from './AccountPreferences';
// import PasswordForgetForm from '../Users/PasswordForget/PasswordForget';
// import PasswordChangeForm from '../Users/PasswordChange/PasswordChange';

//IMPORT UTILITIES
import { withAuthorization } from '../../utilities/Session';
import * as ROUTES from "../../utilities/constants/routes";
import backgroundTemp from '../../Images/TempBackground.PNG';

function Account() {

    return (
    <div>
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
              </Segment>
    </Router>
    <PopMessage />
    </div>
    

    );}
     const condition = role => role > 0;
export default withAuthorization(condition)(Account)

