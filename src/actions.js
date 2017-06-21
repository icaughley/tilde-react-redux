export const SET_PROJECTS = 'SET_PROJECTS';
export const SET_INVOICING = 'SET_INVOICING';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function fetchProjects() {
    return {
        type: SET_PROJECTS,
        payload: fetch('/api/projects').then(res => res.json())
    };
}

export function fetchInvoicings() {
    return {
        type: SET_INVOICING,
        payload: fetch('/api/invoicing').then(res => res.json())
    };
}

export function login(username, password) {
    return {
        type: LOGIN,
        payload: fetch(`/api/users/authenticate/${username}?password=${password}`).then(res => res.json())
    }
}

export function logout() {
    return {type: LOGOUT};
}
