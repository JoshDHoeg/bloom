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
<<<<<<< HEAD
                console.log('here5', authUser._role)
                console.log(condition(authUser._role))
=======
                console.log("here", authUser.uid)
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
                if(!condition(authUser._role)){
                  this.props.history.push(ROUTES.DENIED);
                }
              })
        } else {
            this.props.history.push(ROUTES.SIGN_IN);
        }
        console.log('here5', authUser)
      });
    }
    
    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => { 
<<<<<<< HEAD
             console.log(authUser);
=======
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
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
