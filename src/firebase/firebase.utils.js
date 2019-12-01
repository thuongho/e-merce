// import util library from firebase
import firebase from 'firebase/app';
// need the firebase import above to have the belows available
// DB
import 'firebase/firestore';
// AUTH
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyChxok0sdUDZ8A-9uGNzC2EQCA3LO76_2I",
  authDomain: "emerce-db.firebaseapp.com",
  databaseURL: "https://emerce-db.firebaseio.com",
  projectId: "emerce-db",
  storageBucket: "emerce-db.appspot.com",
  messagingSenderId: "103159887258",
  appId: "1:103159887258:web:7276519cdfc33afc86b623",
  measurementId: "G-YT67L1X0T1"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // if it is null, exit
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = userRef.get();

  // create a new user if doesn't exist
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// GOOGLE AUTH UTIL
const provider = new firebase.auth.GoogleAuthProvider();
// trigger google popup whenever we use auth
provider.setCustomParameters({ prompt: 'select_account' });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;