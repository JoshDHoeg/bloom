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
          console.log('bullshit', authUser)
        if (authUser) {
            this.props.firebase
              .doGetUser(authUser.uid)
              .then(authUser => {
                 console.log("is user a designer: " + authUser._isDesigner);
                 console.log('auth', authUser._role);
                 console.log('t/f', condition(authUser._role));
                if (authUser._role > 0) {
                  if (!authUser._isDesigner) {
                    this.setState({ authUser: {
                      _role: 1 }
                    });
                  }else{
                    this.setState({ authUser: {
                      _role: 2 }
                    });
                    console.log("im confused");
                  }
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
            condition(authUser) ? <Component {...this.props} /> : <h1>This is not the page your looking for</h1>
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
