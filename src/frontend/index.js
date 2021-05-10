import React from "react";
import { render } from "react-dom";
import App from "./routes/App";

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";

import is from "../../initialState.json";
const stringInitialState = JSON.stringify(is);
const { initialState } = JSON.parse(stringInitialState);
initialState.user = {};
initialState.playing = {};

const store = createStore(reducer, initialState);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);
