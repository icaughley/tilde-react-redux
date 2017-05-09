import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import {createStore, applyMiddleware} from "redux";
import authentication from "./middleware/authentication";
import reducers from "./reducers/combined";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import ReduxPromise from "redux-promise";
import "./index.css";

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(ReduxPromise, authentication))
);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
