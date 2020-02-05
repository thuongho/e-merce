import React, { useState } from 'react';
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

// class SignIn extends React.Component {
  // constructor(props) {
    //   super(props);
    
    //   this.state = {
    //     email: '',
    //     password: ''
    //   };
    // }

// change from class to functional component
// destructure and get props are passed in
const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setCredentials] = useState({ email: '', password: '' });
    
  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();

    // const { emailSignInStart } = this.props;
    // const { email, password } = this.state;
    emailSignInStart(email, password);
  };

  const handleChange = event => {
    // get name and value from event
    const { name, value } = event.target;

    // dynamically set name (email/password) to value
    // this.setState({ [name]: value });
    // setCredentials and pass the object of what we want to be
    // spread in userCredentials and update the value
    setCredentials({ ...userCredentials, [name]: value });
  };

  // render() {
    // anything that comes from props just need to be destructured and passed in
    // const { googleSignInStart } = this.props;

  return (
    <SignInContainer onSubmit={handleSubmit}>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>

      <form>
        <FormInput
          name='email'
          type='email'
          value={email}
          handleChange={handleChange}
          label='email'
          required />
        <FormInput
          name='password'
          type='password'
          value={password}
          handleChange={handleChange}
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
};
// }

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);
