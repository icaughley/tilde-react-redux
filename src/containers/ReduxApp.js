import React from "react";
import App from "../components/App";
import {applyMiddleware, createStore} from "redux";
import authentication from "../middleware/authentication";
import messages from "../middleware/messages";
import reducers from "../reducers/combined";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import ReduxPromise from "redux-promise";

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(ReduxPromise, thunk, authentication, messages))
);

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);
