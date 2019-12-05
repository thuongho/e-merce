import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';

import store from './redux/store';

ReactDOM.render(
  // provider allows access to store - must be parent
  // pass store into provider and then it can dispatch to all children
  // browserrouter is a component we wrap around our app
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
