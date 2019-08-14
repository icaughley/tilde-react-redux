import callServer from "./callServer";
import authStore from "../stores/authStore";
import messageStore from "../stores/messageStore";

export function login(username, password) {
    callServer('get', `/api/users/authenticate/${username}?password=${password}`, null, payload => {
        if (payload && payload.authenticated) {
            authStore.login(payload.token, payload.user);
        }
        else {
            messageStore.error("Username or password was incorrect");
            authStore.logout();
        }
    });
}

export function logout() {
    authStore.logout();
}