import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';

const Header = ({ currentUser }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='Logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>SHOP</Link>
      <Link className='option' to='/contact'>CONTACT</Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>SIGN IN</Link>
      )}
    </div>
  </div>
);

// function that allows us to access state
// state is rootreducer
// mapStateToProps is standard namin for redux
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

// first arg of connect is access to rootreducer, which gives null value for currentUser
export default connect(mapStateToProps)(Header);
