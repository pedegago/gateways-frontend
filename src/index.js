/**
 * Required modules.
 */
import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import promise from "redux-promise";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import combineReducers from "./reducers/combineReducers";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layout/Layout";
import "./static/scss/app.scss";

/**
 * Create global store
 */
const store = createStore(
    combineReducers,
    composeWithDevTools(applyMiddleware(thunk, promise))
);

/**
 * Render application into the DOM
 */
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Layout />
        </Router>
    </Provider>,
    document.getElementById("root")
);
