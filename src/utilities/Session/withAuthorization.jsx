// BLOOMTIME DESIGN 2019
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Loading from '../../components/Loading/Loading'
import Denied from '../../components/DenyAccess/accessDenied'
import firebase from 'firebase'
//IMPORT UTILITIES
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../constants/routes';
import * as ROLES from '../constants/roles';

//is it the right user
const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        role: ''
      }
    }
    componentDidMount() {
      let Designer
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
        if (authUser) {
            this.props.firebase
              .doGetUser(authUser.uid)
              .then(authUser => {
                if(!condition(authUser._role)){
                  this.props.history.push(ROUTES.DENIED);
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
          {authUser => { 
             return condition(authUser._role) ? <Component {...this.props} /> : null;
          }}
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
