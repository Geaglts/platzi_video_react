import React from "react";
import { render } from "react-dom";
import App from "./routes/App";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import initialState from "./initialState";

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";

const history = createBrowserHistory();
const store = createStore(reducer, initialState);

render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById("app")
);
