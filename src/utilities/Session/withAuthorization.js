// BLOOMTIME DESIGN 2019
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

//IMPORT UTILITIES
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentPage: this.props.location.pathname 
      };
    }
    componentDidMount() {
      // console.log(this.props.location.pathname);
      this.setState({ currentPage: this.props.location.pathname });
      this.listener = this.props.firebase.isAuthenticated.subscribe(
        authUser => {
          if (authUser !== null && !condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          } else if (this.state.currentPage !== this.props.location) {
            this.props.history.push(this.state.currentPage);
          }
        },
      );
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
