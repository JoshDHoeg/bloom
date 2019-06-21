// BLOOMTIME DESIGN 2019
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Loading from '../../components/Loading/Loading'

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
                if (authUser._role > 0) {
                  if (!authUser._isDesigner && !authUser._isAdmin) {
                    this.setState({ authUser: {
                      _role: 1 }
                    });
                  }else if (authUser._isDesigner) {
                    this.setState({ authUser: {
                      _role: 2 }
                    });
                  }
                }
              })
        } else {
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
            condition(authUser) ? <Component {...this.props} /> : <Loading/>
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
