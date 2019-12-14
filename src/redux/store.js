// catch action firing
import { createStore, applyMiddleware } from 'redux';
// allows browser to cache our store
import { persistStore } from 'redux-persist';
// middleware
import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root.saga';

import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

// persisted version of the store
export const persistor = persistStore(store);

export default { store, persistor };
