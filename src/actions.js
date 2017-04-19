export const SET_PROJECTS = 'SET_PROJECTS';

export function fetchProjects() {
    return dispatch => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => dispatch({
                type: SET_PROJECTS,
                projects: data
            }));
    }
}