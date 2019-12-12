// import util library from firebase
import firebase from 'firebase/app';
// need the firebase import above to have the belows available
// DB
import 'firebase/firestore';
// AUTH
import 'firebase/auth';

const FB_API_KEY = process.env.REACT_APP_FB_KEY;

const config = {
  apiKey: FB_API_KEY,
  authDomain: "emerce-db.firebaseapp.com",
  databaseURL: "https://emerce-db.firebaseio.com",
  projectId: "emerce-db",
  storageBucket: "emerce-db.appspot.com",
  messagingSenderId: "103159887258",
  appId: "1:103159887258:web:7276519cdfc33afc86b623",
  measurementId: "G-YT67L1X0T1"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  console.log('userAuth', userAuth);
  // if it is null, exit
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = userRef.get();

  // create a new user if doesn't exist
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    // const { email } = userAuth;
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  // commits the data into db
  return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// GOOGLE AUTH UTIL
const provider = new firebase.auth.GoogleAuthProvider();
// trigger google popup whenever we use auth
provider.setCustomParameters({ prompt: 'select_account' });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;