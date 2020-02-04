import { all, call, put, takeLatest } from 'redux-saga/effects';

import { clearCart } from './cart.action';

import UserActionTypes from '../user/user.types';

export function* onCartClear() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, onCartClear);
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess)
  ]);
}
