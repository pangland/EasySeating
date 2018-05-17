import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';

const Root = ({ store }) => {
  return (
    <Provider store={ store }>
      <BrowserRouter basename='#'>
        <App/>
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
