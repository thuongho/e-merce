import { takeEvery, call, put } from 'redux-saga/effects';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
  // yield console.log('fetch collections async');
  try {
    const collectionsRef = firestore.collection('collections');
    const snapShot = yield collectionsRef.get();
    const collectionMap = yield call(convertCollectionsSnapshotToMap, snapShot);
    // saga effect for creating action
    yield put(fetchCollectionsSuccess(collectionMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error));
  }
}

export function* fetchCollectionsStart() {
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
