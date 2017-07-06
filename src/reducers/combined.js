import {combineReducers} from "redux";
import {reducer as form} from "redux-form";
import projects from "./projects";
import invoicingEntries from "./invoicingEntries";
import invoicingProjects from "./invoicingProjects";
import selectedProject from "./selectedProject";
import auth from "./auth";
import message from "./message";

export default combineReducers({
    form, projects, auth, message, invoicingEntries, invoicingProjects, selectedProject
});
