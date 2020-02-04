import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    // moved to user sagas
    // const { setCurrentUsers } = this.props;
    // subscribed to auth
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   // only set when not signing out
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);
    //     // subscribed and check to see if db updated with any changes
    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUsers({
    //           id: snapShot.id,
    //           ...snapShot.data()
    //       });
    //     });
    //   } else {
    //     // set to null on sign out
    //     setCurrentUsers(userAuth);
    //   }
    // });
    // check to see if this user has signed in
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  componentWillUnmount() {
    // unsubscribe when the component is destroyed to prevent memory leak
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

// get currentUser from redux
// destructure user from state
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  // method that dispatches action
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
