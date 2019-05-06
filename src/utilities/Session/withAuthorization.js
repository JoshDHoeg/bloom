// BLOOMTIME DESIGN 2019
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

//IMPORT UTILITIES
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../constants/routes';

//is it the right user

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
        if (authUser) {
            this.props.firebase
              .doGetUser(authUser.uid)
              .then(authUser => {
                // console.log("is user a designer: " + authUser._isDesigner);

                if (!condition(authUser)) {
                  console.log(authUser);
<<<<<<< HEAD
                  console.log("not a designer");
                }else{
                  this.setState({ authUser });
                  console.log("im confused");
=======
                  // console.log("not a designer");
                }else{
                  this.setState({ authUser });
                  // console.log("im confused");
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
                }
              })
          } else {
            console.log("not a user");
            this.props.history.push(ROUTES.SIGN_IN);
          }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;