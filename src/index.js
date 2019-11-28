import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  // browserrouter is a component we wrap around our app
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
