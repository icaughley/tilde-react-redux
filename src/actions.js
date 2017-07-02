import axios from "axios";
import qs from "qs";

import * as ActionTypes from "./actionTypes";

export function fetchProjects(user) {
    return {
        type: ActionTypes.GET_PROJECTS,
        payload: axios.get(`/api/users/${user.id}/projects`)
    };
}

export function fetchInvoicingEntries(projectID) {
    return {
        type: ActionTypes.GET_INVOICING,
        payload: axios.get(`/api/invoicing/entries/${projectID}`)
    };
}

export function fetchInvoicingProjects() {
    return {
        type: ActionTypes.GET_INVOICING_PROJECTS,
        payload: axios.get(`/api/invoicing/projects`)
    };
}

export function setProjectCloaked(project, user, value) {
    return {
        type: ActionTypes.SET_PROJECT_CLOAKED,
        payload: axios.post(`/api/users/${user.id}/projects/${project.id}/cloak`, qs.stringify({cloaked: value}))
    }
}

export function login(username, password) {
    return {
        type: ActionTypes.LOGIN,
        payload: axios.get(`/api/users/authenticate/${username}?password=${password}`)
    }
}

export function logout() {
    return {type: ActionTypes.LOGOUT};
}
