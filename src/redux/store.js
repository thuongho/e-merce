// catch action firing
import { createStore, applyMiddleware } from 'redux';
// allows browser to cache our store
import { persistStore } from 'redux-persist';
// middleware
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// persisted version of the store
export const persistor = persistStore(store);

export default { store, persistor };
