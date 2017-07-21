import axios from "axios";
import qs from "qs";

import * as ActionTypes from "./actionTypes";

const DATE_FORMAT = 'YYYY-MM-DD';

function callServer(dispatch, actionType, verb, url, data, extra) {
    axios[verb](url, data ? qs.stringify(data) : null)
        .then(response => dispatch(
            {
                type: actionType,
                payload: response,
                extra
            })
        )
        .catch(err => dispatch(
            {
                type: actionType + ActionTypes.ERROR_SUFFIX,
                payload: err.response
            })
        );
}

// date should be a moment
export function fetchWork(user, from) {
    const fromParam = from.format(DATE_FORMAT);
    const to = from.clone().add(13, 'd');
    const toParam = to.format(DATE_FORMAT);
    console.log( `GET /api/users/${user.id}/work?from=${fromParam}&to=${toParam}` );
    const range = {from,to};
    return dispatch => callServer(dispatch, ActionTypes.GET_WORK, 'get', `/api/users/${user.id}/work?from=${fromParam}&to=${toParam}`, null, range);
}

export function fetchProjects(user) {
    return dispatch => callServer(dispatch, ActionTypes.GET_PROJECTS, 'get', `/api/users/${user.id}/projects`);
}

export function fetchInvoicingEntries(project) {
    return dispatch => {
        dispatch({type: ActionTypes.SET_SELECTED_PROJECT, selectedProject: project});
        callServer(dispatch,
            ActionTypes.GET_INVOICING,
            'get',
            `/api/invoicing/entries/${project.id}`);
    }
}

export function fetchBillableProjects() {
    return dispatch => callServer(dispatch,
        ActionTypes.GET_BILLABLE_PROJECTS,
        'get',
        `/api/invoicing/projects`);
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

export function closeMessage() {
    return {type: ActionTypes.CLOSE_MESSAGE};
}
