import {combineReducers} from "redux";
import {reducer as form} from "redux-form";
import projects from "./projects";
import invoicingEntries from "./invoicingEntries";
import invoicingProjects from "./invoicingProjects";
import auth from "./auth";

export default combineReducers({
    form, projects, invoicingEntries, invoicingProjects, auth
});
