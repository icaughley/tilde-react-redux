import {combineReducers} from "redux";
import {reducer as form} from "redux-form";
import projects from "./projects";
import auth from "./auth";

export default combineReducers({
    form, projects, auth
});
