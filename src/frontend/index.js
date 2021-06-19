import React from 'react';
import { hydrate } from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './routes/App';
import reducer from './reducers';

// Redux thunk
import thunk from 'redux-thunk';

const history = createBrowserHistory();
const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(reducer, preloadedState);

delete window.__PRELOADED_STATE__;

hydrate(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
