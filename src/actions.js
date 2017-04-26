export const SET_PROJECTS = 'SET_PROJECTS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

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

export function login( username, password ) {
    return dispatch => {
        fetch(`/api/users/authenticate/${username}?password=${password}`)
            .then(res => res.json())
            .then(data => {
                if (data.authenticated) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        user: data
                    });
                }
                else {
                    dispatch({
                        type: LOGIN_FAIL,
                        user: null
                    });

                }
            })
    }
}

export function logout() {
    return dispatch => dispatch({type: LOGOUT});
}