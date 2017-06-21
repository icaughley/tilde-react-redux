import {combineReducers} from "redux";
import {reducer as form} from "redux-form";
import projects from "./projects";
import invoicings from "./invoicings";
import auth from "./auth";

export default combineReducers({
    form, projects, invoicings, auth
});
