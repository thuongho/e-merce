import React from 'react';
import { connect } from 'react-redux';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
// import { auth, SignInWithGoogle } from '../../firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer
} from './sign-in.styles';
// import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { emailSignInStart } = this.props;
    const { email, password } = this.state;
    emailSignInStart(email, password);
    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    //   this.setState({ email: '', password: '' });
    // } catch (error) {
    //   console.log('Error signing in', error);
    // }
  };

  handleChange = event => {
    // get name and value from event
    const { name, value } = event.target;

    // dynamically set name (email/password) to value
    this.setState({ [name]: value });
  };

  render() {
    const { googleSignInStart } = this.props;

    return (
      <SignInContainer onSubmit={this.handleSubmit}>
        <SignInTitle>I already have an account</SignInTitle>
        <span>Sign in with your email and password</span>

        <form>
          <FormInput
            name='email'
            type='email'
            value={this.state.email}
            handleChange={this.handleChange}
            label='email'
            required />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required />

          <ButtonsBarContainer>
            <CustomButton type='submit'>Sign in</CustomButton>
            <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
              {' '}
              Sign in with Google{' '}
            </CustomButton>
          </ButtonsBarContainer>
        </form>
      </SignInContainer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);
