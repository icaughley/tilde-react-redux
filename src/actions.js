import axios from "axios";
import qs from "qs";
import * as ActionTypes from "./actionTypes";

function callServer(dispatch, actionType, verb, url, data) {
    axios[verb](url, data ? qs.stringify(data) : null)
        .then(response => dispatch(
            {
                type: actionType,
                payload: response
            })
        )
        .catch(err => dispatch(
            {
                type: actionType + ActionTypes.ERROR_SUFFIX,
                payload: err.response
            })
        );
}

export function fetchProjects(user) {
    return dispatch => callServer(dispatch, ActionTypes.GET_PROJECTS, 'get', `/api/users/${user.id}/projects`);
}

export function setProjectCloaked(project, user, value) {
    return dispatch => callServer(dispatch,
        ActionTypes.SET_PROJECT_CLOAKED,
        'put',
        `/api/users/${user.id}/projects/${project.id}/cloak`,
        {cloaked: value});
}

export function addProject(project) {
    return dispatch => callServer(dispatch, ActionTypes.CREATE_PROJECT, 'post', `/api/projects`, project);
}

export function updateProject(project) {
    return dispatch => callServer(dispatch, ActionTypes.UPDATE_PROJECT, 'put', `/api/projects/${project.id}`, project);
}

export function deleteProject(project) {
    return dispatch => callServer(dispatch, ActionTypes.DELETE_PROJECT, 'delete', `/api/projects/${project.id}`);
}

export function login(username, password) {
    return dispatch => callServer(dispatch,
        ActionTypes.LOGIN,
        'get',
        `/api/users/authenticate/${username}?password=${password}`);
}

export function logout() {
    return {type: ActionTypes.LOGOUT};
}
