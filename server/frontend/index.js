import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';

//Set the initial state and initialize the store with the initial state
const initialState = {page: {currentPage: 1}};
const store = configureStore(initialState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
