// BLOOMTIME DESIGN 2019
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//IMPORT COMPONENTS
import Navigation from './components/Navigation';

//IMPORT CONTAINERS
import SignUpPage from './containers/Users/SignUp';
import SignInPage from './containers/Users/SignIn';
import PasswordForgetPage from './containers/Users/PasswordForget';
import ProjectPage from './containers/Project';
import AccountPage from './containers/Account';
import ProjectListPage from './containers/ProjectList';



//IMPORT UTILITIES
import * as ROUTES from './utilities/constants/routes';
import { withAuthentication } from './utilities/Session';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>

      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.PROJECT} component={ProjectPage} />

      <Route path={ROUTES.PROJECT_LIST} exact component={ProjectListPage} />
    </div>
  </Router>
);

export default withAuthentication(App);
