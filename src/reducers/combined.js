import {combineReducers} from "redux";
import {reducer as form} from "redux-form";
import projects from "./projects";
import invoicingEntries from "./invoicingEntries";
import billableProjects from "./billableProjects";
import selectedProject from "./selectedProject";
import auth from "./auth";
import message from "./message";

export default combineReducers({
    form, projects, auth, message, invoicingEntries, billableProjects, selectedProject
});
