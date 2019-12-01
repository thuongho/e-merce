import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // subscribed to auth
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // only set when not signing out
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // subscribed and check to see if db updated with any changes
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          // async callback
          }, () => {
            // console.log('create user', this.state);
          });
        });
      } else {
        // set to null on sign out
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    // unsubscribe when the component is destroyed to prevent memory leak
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
