import {LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from "../actions";

export default function projects(state = null, action = {}) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.user;
        case LOGIN_FAIL:
        case LOGOUT:
            return null;
        default:
            return state;
    }
};
