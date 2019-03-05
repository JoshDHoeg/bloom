// BLOOMTIME DESIGN 2019
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { compose } from 'recompose';

//IMPORT CONTAINERS
import { SignInLink } from '../SignIn';
import backgroundTemp from '../../../Images/TempBackground.PNG';

//IMPORT UTILITIES
import { withFirebase } from '../../../utilities/Firebase';
import * as ROUTES from '../../../utilities/constants/routes';

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
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/logo.png' /> Sign-Up to your account
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
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { name, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        // console.log({authUser.user.uid});
        return this.props.firebase
          .doSetUser(authUser.user.uid)
          .set({
            name,
            email
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.PROJECT);
      })
      .catch(error => {
        console.log({ error });
        this.setState({ error });
      });

    event.preventDefault();
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
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      name === '';

    return (
<<<<<<< HEAD
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
          <Button color='teal' fluid size='large' disabled={isInvalid} type="submit">
            Login
          </Button>
          {error && <p>{error.message}</p>}
        </Segment>
      </Form>
=======
      <div class="signup-form" style={{ backgroundImage: "url(" + backgroundTemp + ")", backgroundRepeat: 'repeat'}}>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.signup-form {
            height: 100%;
          }
        `}</style>
        <Form size='large' onSubmit={this.onSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              name='username'
              value={username}
              onChange={this.onChange}
              type='text'
            />
            <Form.Input
              fluid
              icon='email'
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
              type='passwordTwo'
              name='password'
              value={passwordTwo}
              onChange={this.onChange}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Confirm Password'
              type='password'
              name='passwordOne'
              value={passwordOne}
              onChange={this.onChange}
            />
            <Button color='teal' fluid size='large' disabled={isInvalid} type="submit">
              Sign Up
            </Button>
            {error && <p>{error.message}</p>}
          </Segment>
        </Form>
      </div>
>>>>>>> taytay
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
