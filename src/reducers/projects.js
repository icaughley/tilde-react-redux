import {SET_PROJECTS} from "../actions";

export default function (state = [], action = {}) {
    switch (action.type) {
        case SET_PROJECTS:
            return action.payload.data;
        default:
            return state;
    }
};