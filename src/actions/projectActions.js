import callServer from "./callServer";
import {action} from "mobx";
import projectStore from "../stores/projectStore";
import messageStore from "../stores/messageStore";
import _ from "lodash";

export function fetchProjects(user) {
    callServer('get', `/api/users/${user.id}/projects`, null, action(payload => {
        _.forEach(payload, (project) => projectStore.projects.set(project.id, project));
    }));
}

export function fetchBillableProjects() {
    callServer('get', `/api/invoicing/projects`, null, action(payload => {
        _.forEach(payload, (project) => projectStore.billableProjects.set(project.id, project));
    }));
}

export function setProjectCloaked(project, user, value) {
    callServer('put', `/api/users/${user.id}/projects/${project.id}/cloak`,
        {cloaked: value},
        action(payload => handleProjectUpdated(payload, "updated")));
}

export function addProject(project) {
    callServer('post', `/api/projects`,
        project,
        action(payload => handleProjectUpdated(payload, "created")));
}

export function updateProject(project) {
    callServer('put', `/api/projects/${project.id}`,
        project,
        action(payload => handleProjectUpdated(payload, "updated")));
}

export function deleteProject(project) {
    callServer('delete', `/api/projects/${project.id}`, null,
        action(payload => {
            projectStore.projects.delete(payload.id);
        }));
}

function handleProjectUpdated(project, action) {
    messageStore.success("Project successfully " + action);
    projectStore.projects.set(project.id, project);
}