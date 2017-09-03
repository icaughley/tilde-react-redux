import {combineReducers} from "redux";
import {reducer as form} from "redux-form";
import {routerReducer as router} from 'react-router-redux';
import projects from "./projects";
import invoicingEntries from "./invoicingEntries";
import billableProjects from "./billableProjects";
import selectedProject from "./selectedProject";
import auth from "./auth";
import message from "./message";
import work from "./work";

export default combineReducers({
    form, router, projects, auth, message, invoicingEntries, billableProjects, selectedProject, work
});
