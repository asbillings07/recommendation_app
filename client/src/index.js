import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import 'formol/lib/default.css';
import { Provider } from './Context';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://6ae03774cdff4bfabdbcd523e89d61b0@sentry.io/1726112',
});

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
