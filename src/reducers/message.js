import * as ActionTypes from "../actionTypes";

function openMessage(type, msg) {
    let icon;
    let header;
    switch (type) {
        case "success":
            icon = "check circle";
            header = "Success";
            break;
        case "error":
            icon = "warning sign";
            header = "Error";
            break;
        default:
    }
    return {open: true, icon, header, type, msg}
}

export default function (state = {}, action = {}) {
    switch (action.type) {
        case ActionTypes.OPEN_MESSAGE:
            return openMessage(action.payload.type, action.payload.msg);
        case ActionTypes.CLOSE_MESSAGE:
            return {...state, open: false};
        default:
            return state;
    }
};