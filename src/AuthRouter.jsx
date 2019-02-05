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
import DesignerPage from './containers/Designer';
import ProjectConceptPage from './containers/Project/Concept';
import ProjectBriefPage from './containers/Project/Brief';
import ProjectFinalPage from './containers/Project/Final';
import ProjectRevisionsPage from './containers/Project/Revisions';

//IMPORT UTILITIES
import * as ROUTES from './utilities/constants/routes';
import { withAuthentication } from './utilities/Session';
import Project from './containers/Project';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.PROJECT} component={ProjectPage} />
      <Route path={ROUTES.DESIGNER} component={DesignerPage} />

      <Route path={ROUTES.CLIENT_CONCEPT} component={ProjectConceptPage}/>
      <Route path={ROUTES.CLIENT_BRIEF} component={ProjectBriefPage}/>
      <Route path={ROUTES.CLIENT_REVISIONS} component={ProjectRevisionsPage}/>
      <Route path={ROUTES.CLIENT_FINAL} component={ProjectFinalPage}/>
    </div>
  </Router>
);

export default withAuthentication(App);
