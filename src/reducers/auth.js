import {LOGIN_SUCCESS, LOGIN_FAIL} from "../middleware/authentication";
import {LOGOUT} from "../actionTypes";

export default function (state = null, action = {}) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.auth;
        case LOGIN_FAIL:
        case LOGOUT:
            return null;
        default:
            return state;
    }
};
