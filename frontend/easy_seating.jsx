import React from 'react';
import ReactDOM from 'react-dom';
import * as APIUtil from './util/session_api_util';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  window.login = APIUtil.login;
  window.logout = APIUtil.logout;
  window.signup = APIUtil.signup;

  const store = configureStore();
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  const root = document.getElementById('root');
  ReactDOM.render(<h1>Welcome to EasySeating</h1>, root);
});
