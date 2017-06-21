import axios from "axios";
import qs from "qs";

export const SET_PROJECTS = 'SET_PROJECTS';
export const SET_INVOICING = 'SET_INVOICING';
export const SET_PROJECT_CLOAKED = 'SET_PROJECT_CLOAKED';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function fetchProjects(user) {
    return {
        type: SET_PROJECTS,
        payload: axios.get(`/api/users/${user.id}/projects`)
    };
}

export function fetchInvoicings() {
    return {
        type: SET_INVOICING,
        payload: fetch('/api/invoicing').then(res => res.json())
    };

    export function setCloaked(project, user, value) {
        return {
            type: SET_PROJECT_CLOAKED,
            payload: axios.post(`/api/users/${user.id}/projects/${project.id}/cloak`, qs.stringify({cloaked: value}))
        }
    }

    export function login(username, password) {
        return {
            type: LOGIN,
            payload: axios.get(`/api/users/authenticate/${username}?password=${password}`)
        }
    }

    export function logout() {
        return {type: LOGOUT};
    }
