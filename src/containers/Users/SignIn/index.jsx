// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { compose } from 'recompose';

import backgroundTemp from '../../../Images/TempBackground.PNG';

//IMPORT CONTAINERS
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';

//IMPORT UTILITIES
import { withFirebase } from '../../../utilities/Firebase';
import * as ROUTES from '../../../utilities/constants/routes';

const SignInPage = () => (
  <div className='login-form' style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat'}}>
    <style>{`
    body > div,
    body > div > div,
    body > div > div > div.login-form {
      height: 100%;
    }
  `}</style>

    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' /> Log-in to your account
        </Header>
        <SignInForm />
        <Message>
          <PasswordForgetLink />
          <SignUpLink />
        </Message>
      </Grid.Column>
    </Grid>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(result => {
        if (result) {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.PROJECT);
        } else {
          // error
          // this.setState({ error });
        }
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
        <Form size='large' onSubmit={this.onSubmit}>
          <Segment stacked>
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
              name='password'
              value={password}
              onChange={this.onChange}
            />
            <Button color='teal' fluid size='large' disabled={isInvalid} type="submit">
              Login
            </Button>
            {error && <p>{error.message}</p>}
          </Segment>
        </Form>

    );
  }
}
const SignInLink = () => (
  <p>
    Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </p>
);

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm, SignInLink };
