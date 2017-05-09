import React from "react";
import {Route, Link} from "react-router-dom";
import "../style/style.css";
import ProjectsPage from "../containers/ProjectsPage";

export default function Nav({userName, logoutCallback}) {
    return (
        <div>
            <div className="menu">
                <span>Welcome <strong>{userName}</strong></span>
                <span className="menu-right">
                    | <Link to="timeSheet">Time Sheet</Link>
                    | <Link to="projects">Projects</Link>
                    | <Link to="invoicing">Invoicing</Link>
                    | <Link to="payroll">Pay Roll</Link>
                    | <a href="#" onClick={logoutCallback}>Log Out</a> |
                </span>
            </div>

            <div className="page-holder">
                <Route path="/projects" component={ProjectsPage}/>
            </div>
        </div>
    );
}

