import { takeLatest, call, put, all } from 'redux-saga/effects';

// need actions to dispatch
import { signInSuccess, signInFailure } from './user.actions';
import { auth, getCurrentUser, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';

import UserActionTypes from './user.types';

function* getUserSnapshotFromUserAuth(userAuth) {
  // any api call has potential for fail, so we use try catch for api calls
  try {
     // yield console.log('google sign in start', user);
    // createUserProfileDocument to get userRef to get snapshot
    const userRef = yield call(createUserProfileDocument, userAuth);
    // yield console.log('userRef', userRef);
    const snapShot = yield userRef.get();
    // .data() gives displayName and email
    // yield console.log('snapShot', snapShot.data());
    // put is the same as dispatch signInSuccess with object
    yield put(signInSuccess({ id: snapShot.id, ...snapShot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(
    UserActionTypes.GOOGLE_SIGN_IN_START,
    googleSignIn
  );
}

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getUserSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
};

export function* onEmailSignInStart() {
  yield takeLatest(
    UserActionTypes.EMAIL_SIGN_IN_START,
    emailSignIn
  );
}

export function* onCheckUserSession() {
  yield takeLatest(
    UserActionTypes.CHECK_USER_SESSION,
    isUserAuthenticated
  )
}

export function* emailSignIn({ payload: {email, password} }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getUserSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getUserSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// export userSagas to use in root sagas
export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(isUserAuthenticated)
  ]);
};
