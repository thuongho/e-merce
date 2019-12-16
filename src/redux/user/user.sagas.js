import { takeLatest, call, put, all } from 'redux-saga/effects';

// need actions to dispatch
import { googleSignInSuccess, googleSignInFailure } from './user.actions';
import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';

import UserActionTypes from './user.types';

export function* onGoogleSignInStart() {
  yield takeLatest(
    UserActionTypes.GOOGLE_SIGN_IN_START,
    googleSignIn
  );
}

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    // yield console.log('google sign in start', user);
    // createUserProfileDocument to get userRef to get snapshot
    const userRef = yield call(createUserProfileDocument, user);
    // yield console.log('userRef', userRef);
    const snapShot = yield userRef.get();
    // .data() gives displayName and email
    // yield console.log('snapShot', snapShot.data());
    yield put(googleSignInSuccess({ id: snapShot.id, ...snapShot.data() }));
  } catch (error) {
    yield put(googleSignInFailure(error));
  }
};

export function* userSagas() {
  yield all([call(onGoogleSignInStart)]);
};
