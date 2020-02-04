import { all, takeLatest, call, put } from 'redux-saga/effects';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// listening for specific action types
import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
  // yield console.log('fetch collections async');
  try {
    const collectionsRef = firestore.collection('collections');
    const snapShot = yield collectionsRef.get();
    // call takes first method, and anything subsequent becomes parameters
    // yield call to defer control back to saga middleware
    const collectionMap = yield call(convertCollectionsSnapshotToMap, snapShot);
    // put - saga effect for creating action - put dispatches object
    yield put(fetchCollectionsSuccess(collectionMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error));
  }
}

export function* fetchCollectionsStart() {
  // takeLatest - non blocking call
  // when it hears FETCH_COLLECTIONS_START, it fires off fetchCollectionsAsync
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
