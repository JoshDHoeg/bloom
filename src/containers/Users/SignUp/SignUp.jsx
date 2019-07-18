// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { compose } from 'recompose';

//IMPORT CONTAINERS
import { SignInLink } from '../SignIn/SignIn';

//IMPORT UTILITIES
import { withFirebase } from '../../../utilities/Firebase';
import * as ROUTES from '../../../utilities/constants/routes';
import * as ROLES from '../../../utilities/constants/roles';

const SignUpPage = () => (
  <div className='signup-form'>
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.signup-form {
        height: 100%;
      }
    `}</style>

      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='black' textAlign='center'>
            Sign up for Bloomtime Design
          </Header>
          <SignUpForm />
          <Message>
            <SignInLink />
          </Message>
        </Grid.Column>
      </Grid>
    </div>
);

const INITIAL_STATE = {
  name: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
<<<<<<< HEAD
  isEmaillist: true,
  error: null,
  isDesigner: false
=======
  Emaillist: true,
  error: null,
  isDesigner: false,
  role: 1,
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
<<<<<<< HEAD
    const { name, email, passwordOne, isDesigner, isEmaillist } = this.state;
=======
    const { name, email, passwordOne, isDesigner, Emaillist, role, authUser } = this.state;
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
    const roles = [];
    if (isDesigner) {
      roles.push(ROLES.DESIGNER)
    }else {
      roles.push(ROLES.HOMEOWNER)
    }
    this.props.firebase
<<<<<<< HEAD
      .doInitNewUser(email, passwordOne, name, isDesigner, isEmaillist)
=======
      .doInitNewUser(email, passwordOne, name, isDesigner, Emaillist, role, authUser)
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
      //.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
         return this.props.firebase
         .user(authUser.uid)
         .set({
           name,
           email,
           role,
         })
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.PROJECT_LIST);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChangeCheckbox = event => {
<<<<<<< HEAD
    this.setState({ isEmaillist: !this.state.isEmaillist })
=======
    this.setState({ Emaillist: !this.state.Emaillist })
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      name,
      email,
      passwordOne,
      passwordTwo,
      isDesigner,
<<<<<<< HEAD
      isEmaillist,
=======
      Emaillist,
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      name === '';

    return (
      <Form size='large' onSubmit={this.onSubmit}>
        <Segment stacked>
          <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            placeholder='Name'
            name='name'
            value={name}
            onChange={this.onChange}
            type='text'
          />
          <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            placeholder='E-mail address'
            name='email'
            value={email}
            onChange={this.onChange}
            type='text'
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            name='passwordOne'
            value={passwordOne}
            onChange={this.onChange}
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Confirm Password'
            type='password'
            name='passwordTwo'
            value={passwordTwo}
            onChange={this.onChange}
          />
          <Form.Checkbox
            label="Join EmailList"
            name="Emailist"
            toggle
<<<<<<< HEAD
            checked={isEmaillist}
=======
            checked={Emaillist}
>>>>>>> 2c9a7fdb3c6d40e041db2efd69cf725d637e7afa
            onChange={this.onChangeCheckbox}
          />
          
          <Button color='teal' fluid size='large' disabled={isInvalid} type="submit" style={{backgroundColor: "#F5BDF9"}}>
            Sign Up
          </Button>
          {error && <p>{error.message}</p>}
        </Segment>
      </Form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
