// BLOOMTIME DESIGN 2019
import React from 'react';

//IMPORT UTILITIES
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

//is it the correct user
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
<<<<<<< HEAD
        authUser: "fuck"
=======
        authUser: ''
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
      };
    }

    componentDidMount() {
<<<<<<< HEAD
      console.log("fuck the fucking outside world ");
=======
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          console.log("fuck the fucking world");
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        }
      );
    }
    
    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};

export default withAuthentication;
