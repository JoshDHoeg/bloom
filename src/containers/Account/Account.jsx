// BLOOMTIME DESIGN 2019
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar} from 'semantic-ui-react';
//IMPORT CONTAINERS
//import AccountPreferences from './AccountPreferences';
// import PasswordForgetForm from '../Users/PasswordForget/PasswordForget';
// import PasswordChangeForm from '../Users/PasswordChange/PasswordChange';

//IMPORT UTILITIES
import { withAuthorization } from '../../utilities/Session';
import * as ROUTES from "../../utilities/constants/routes";
import backgroundTemp from '../../Images/TempBackground.PNG';
import AccountInfoPage from './components/AccountInfo/AccountInfo'

class Account extends Component {
  render(){
      return(
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
      )
  }
}

const condition = role => role > 0;

export default withAuthorization(condition)(Account)

