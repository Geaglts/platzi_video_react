import React from "react";
import { hydrate } from "react-dom";
import App from "./routes/App";
import { Router } from "react-router";
import { createBrowserHistory } from "history";

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";

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
    document.getElementById("app")
);
