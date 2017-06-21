import axios from "axios";

export const SET_PROJECTS = 'SET_PROJECTS';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function fetchProjects(user) {
    return {
        type: SET_PROJECTS,
        payload: axios.get(`/api/users/${user.id}/projects`)
    };
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
