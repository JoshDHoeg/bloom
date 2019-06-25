// BLOOMTIME DESIGN 2019
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//IMPORT COMPONENTS
import Navigation from './components/Navigation/Navigation';

//IMPORT CONTAINERS
import SignUpPage from './containers/Users/SignUp/SignUp';
import SignInPage from './containers/Users/SignIn/SignIn';
import PasswordForgetPage from './containers/Users/PasswordForget/PasswordForget';
import ProjectPage from './containers/Project/Project';
import AccountPage from './containers/Account/Account';
import ProjectListPage from './containers/ProjectList/ProjectList';
import Messaging from './containers/Messaging/Messaging';
import House from './containers/Project/UserProject/HouseVisit/HouseVisit'
import Payment from './containers/Project/UserProject/Payment/Payment'
import Denied from './components/DenyAccess/accessDenied'
//IMPORT UTILITIES
import * as ROUTES from './utilities/constants/routes';
import { withAuthentication } from './utilities/Session';

const App = () => (
  
    <Router>
      <div>
        <Navigation />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.PROJECT} component={ProjectPage} />
        <Route path={ROUTES.MESSAGING} component={Messaging} />
        <Route path={ROUTES.PROJECT_LIST} exact component={ProjectListPage} />
        <Route path={ROUTES.HOUSE} exact component = {House} />
        <Route path={ROUTES.PAYMENT} exact component = {Payment} />
        <Route path={ROUTES.DENIED} exact component ={Denied} />
      </div>
    </Router>
);

export default withAuthentication(App);
