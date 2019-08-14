import React from "react";
import {Link} from "react-router-dom";
import {logout} from "../actions/authActions";
import authStore from "../stores/authStore";
import {observer} from "mobx-react";

export default observer(() => {
    return (
        <div>
            <div className="menu">
                <span>Welcome <strong>{authStore.user.name}</strong></span>
                <span className="menu-right">
                    <Link to="/timeSheet">Time Sheet</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/invoicing">Invoicing</Link>
                    <Link to="/payroll">Payroll</Link>
                    <a href="#" onClick={logout}>Log Out</a>
                </span>
            </div>
        </div>
    );
});
