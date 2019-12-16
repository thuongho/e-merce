import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
  // all allows for adding multiple concurrent generator functions
  yield all([
    call(fetchCollectionsStart),
    call(userSagas)
  ]);
};
