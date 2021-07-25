import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer from './store/reducers';
import { Provider } from 'react-redux';
const {createStore} = require('redux');
const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


