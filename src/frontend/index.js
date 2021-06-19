import React from 'react';
import { hydrate } from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

// Redux
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';

// Redux thunk
import thunk from 'redux-thunk';

import App from './routes/App';
import reducer from './reducers';

// Compose configuration
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(
  reducer,
  preloadedState,
  composeEnhancers(applyMiddleware(thunk)),
);
const history = createBrowserHistory();

delete window.__PRELOADED_STATE__;

hydrate(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
