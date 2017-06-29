import axios from "axios";
import qs from "qs";
import * as ActionTypes from "./actionTypes";

export function fetchProjects(user) {
    return {
        type: ActionTypes.GET_PROJECTS,
        payload: axios.get(`/api/users/${user.id}/projects`)
    };
}

export function setProjectCloaked(project, user, value) {
    return {
        type: ActionTypes.SET_PROJECT_CLOAKED,
        payload: axios.post(`/api/users/${user.id}/projects/${project.id}/cloak`, qs.stringify({cloaked: value}))
    }
}

export function addProject(project) {
    return {
        type: ActionTypes.CRATE_PROJECT,
        payload: axios.put('/api/projects', qs.stringify({project}))
    }
}

export function updateProject(project) {
    return {
        type: ActionTypes.UPDATE_PROJECT,
        payload: axios.post(`/api/projects/${project.id}`, qs.stringify({project}))
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
