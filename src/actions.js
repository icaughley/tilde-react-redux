import axios from "axios";
import qs from "qs";

export const SET_PROJECTS = 'SET_PROJECTS';
export const SET_INVOICING = 'SET_INVOICING';
export const SET_PROJECT_CLOAKED = 'SET_PROJECT_CLOAKED';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
import * as ActionTypes from "./actionTypes";

export function fetchProjects(user) {
    return {
        type: ActionTypes.GET_PROJECTS,
        payload: axios.get(`/api/users/${user.id}/projects`)
    };
}

export function fetchInvoicings() {
    return {
        type: SET_INVOICING,
        payload: fetch('/api/invoicing').then(res => res.json())
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
