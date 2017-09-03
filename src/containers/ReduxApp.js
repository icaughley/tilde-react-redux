import React from "react";
import {applyMiddleware, createStore} from "redux";
import {ConnectedRouter, routerMiddleware} from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import ReduxPromise from "redux-promise";
import axios from "axios";

import authentication from "../middleware/authentication";
import messages from "../middleware/messages";
import reducers from "../reducers/combined";
import App from "../components/App";

const history = createHistory();
const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            ReduxPromise,
            thunk,
            authentication,
            messages
        )
    )
);

axios.interceptors.request.use(config => {
        config.headers = {
            ...config.headers,
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            Authorization: store.getState().auth ? store.getState().auth.token : ""
        };
        return config;
    }
);

export default () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
);
