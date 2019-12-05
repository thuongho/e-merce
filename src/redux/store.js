// catch action firing
import { createStore, applyMiddleware } from 'redux';
// middleware
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
