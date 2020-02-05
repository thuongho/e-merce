import React, { useState } from 'react';
import { connect } from 'react-redux';

import { signUpStart } from '../../redux/user/user.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import {
  SignUpContainer,
  SignUpTitle
} from './sign-up.styles';

// class SignUp extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       displayName: '',
//       email: '',
//       password: '',
//       confirmPassword: ''
//     }
//   }
const SignUp = ({ signUpStart }) => {

  const [userCredentials, setCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '' 
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleChange = event => {
    const { name, value } = event.target;
    // this.setState({ [name]: value });
    setCredentials({ ...userCredentials, [name]: value });
  }

  const handleSubmit = async event => {
    event.preventDefault();

    // const { signUpStart } = this.props;
    // const { displayName, email, password, confirmPassword } = this.state;

    // check password match
    if (password !== confirmPassword) {
      alert('Passwords don\'t match!');
      return;
    }

    signUpStart({ email, password, displayName });
  }

  // render() {
  //   const { displayName, email, password, confirmPassword } = this.state;

  return(
    <SignUpContainer>
      <SignUpTitle>I do not have an account</SignUpTitle>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          label='Name'
          required />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          label='Email'
          required />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='Password'
          required />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          label='Confirm Password'
          required />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </SignUpContainer>
  );
}
// }

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);
