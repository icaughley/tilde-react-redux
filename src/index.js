import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {createStore, applyMiddleware} from "redux";
import authentication from "./middleware/authentication";
import reducers from "./reducers/combined";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import ReduxPromise from "redux-promise";
import 'semantic-ui-css/semantic.min.css';
import "./index.css";

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(ReduxPromise, thunk, authentication))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
