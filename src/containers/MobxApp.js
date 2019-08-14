import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import axios from "axios";
// import authentication from "../middleware/authentication";
// import messages from "../middleware/messages";
import App from "../components/App";
import authStore from "../stores/authStore";

// applyMiddleware(
//     routerMiddleware(history),
//     ReduxPromise,
//     thunk,
//     authentication,
//     messages
// )

axios.interceptors.request.use(config => {
        config.headers = {
            ...config.headers,
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            Authorization: authStore.authenticated ? authStore.token : ""
        };
        return config;
    }
);

export default () => (
    <Router>
        <App />
    </Router>
);
