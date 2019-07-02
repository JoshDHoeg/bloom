// BLOOMTIME DESIGN 2019
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//IMPORT COMPONENTS
import Navigation from './components/Navigation/Navigation';

//IMPORT CONTAINERS
import SignUpPage from './containers/Users/SignUp/SignUp';
import SignInPage from './containers/Users/SignIn/SignIn'; //inputs for sign in info, as well as sign in verification
import PasswordForgetPage from './containers/Users/PasswordForget/PasswordForget'; //password forget form
import ProjectPage from './containers/Project/Project'; //seems to determine whether to route to designer interface or user project list?
import AccountPage from './containers/Account/Account'; //holds router to access account page
import ProjectListPage from './containers/ProjectList/ProjectList'; //project list including if user is designer (in class), budget info, stage of project, etc
import Messaging from './containers/Messaging/Messaging'; //messaging window, defaults on help channel, different message channels
import House from './containers/Project/UserProject/HouseVisit/HouseVisit'; //main page information, can route to scheduling house visit or project
import Payment from './containers/Project/UserProject/Payment/Payment'; //information from payment page, ie status etc
import Denied from './components/DenyAccess/accessDenied'; // import message if on invalid page
//IMPORT UTILITIES
import * as ROUTES from './utilities/constants/routes'; // import full page of routes
import { withAuthentication } from './utilities/Session'; //imports user authentication?

const App = () => (
  
    <Router>
      <div>
        <Navigation />
        {/* each route will go to a specific location when called */}
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

export default withAuthentication(App); //checks authentication before rerouting
