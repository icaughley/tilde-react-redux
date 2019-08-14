import React from "react";
import {observer} from "mobx-react";
import {Redirect} from "react-router-dom";
import authStore from "../stores/authStore";

export default observer((props) => {
    if (authStore.authenticated) {
        return <div>{props.children}</div>;
    } else {
        return <Redirect to="/login"/>;
    }
});
