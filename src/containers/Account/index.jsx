// BLOOMTIME DESIGN 2019
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar} from 'semantic-ui-react';
//IMPORT CONTAINERS
import AccountInfo from './AccountInfo';
import AccountPreferences from './AccountPreferences';
import PaymentOptions from './PaymentOptions';
import SignOutButton from '../../containers/Users/SignOut';
//import AccountPreferences from './AccountPreferences';
import PasswordForgetForm from '../Users/PasswordForget';
import PasswordChangeForm from '../Users/PasswordChange';

//IMPORT UTILITIES
import { AuthUserContext, withAuthorization } from '../../utilities/Session';
import * as ROUTES from "../../utilities/constants/routes";

import backgroundTemp from '../../Images/TempBackground.PNG';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
        <div>
          <div>
            <h1>Account: {authUser.email}</h1>
            <PasswordForgetForm />
            <PasswordChangeForm />
          </div>
          <br/>
          <br/>
        </div>
    )}
  </AuthUserContext.Consumer>
);

const AccountPageWithSidebar = () => (
  <div style={{ backgroundImage: "url("+ backgroundTemp + ")", backgroundRepeat: 'repeat'}}>
    <Sidebar.Pushable as={Segment} style={{ marginTop: "-9px", marginLeft: '-3px', marginRight: '3px', minHeight: "400px" }}>
      <Router>
        <div>
          <Sidebar as={Menu} icon='labeled' vertical visible width='thin'>
              <div style={{ paddingLeft: "50px", paddingTop: "25px", paddingBottom: "30px" }}>
                <img className="ui small circular image" src="https://react.semantic-ui.com/images/avatar/large/matthew.png" style={{ height: "55px", width: "55px" }} />
              </div>
              <Menu.Item as={Link} to={ROUTES.ACCOUNT_INFO}>
                <div style={{ paddingTop: "10px", paddingBottom: "10px"}}>
                  <Icon name='info circle' />
                  Account Info
                </div>
              </Menu.Item>
              <Menu.Item as={Link} to={ROUTES.ACCOUNT_PREFERENCES}>
                <div style={{ paddingTop: "10px", paddingBottom: "10px"}}>
                 <Icon name='cog' />
                 Preferences
                </div>
              </Menu.Item>
              <Menu.Item as= {Link} to={ROUTES.PAYMENT_OPTIONS}>
                <div style={{ paddingTop: "10px", paddingBottom: "10px"}}>
                  <Icon name='money bill alternate outline' />
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
                  <Route path={ROUTES.ACCOUNT_INFO} component={AccountInfo} />
                  <Route path={ROUTES.ACCOUNT_PREFERENCES} component={AccountPreferences} />
                  <Route path={ROUTES.PAYMENT_OPTIONS} component ={PaymentOptions} />
                </div>
                </Segment>
            </Sidebar.Pusher>
        </div>
      </Router>
    </Sidebar.Pushable>
  </div>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPageWithSidebar);
