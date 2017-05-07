import {SET_PROJECTS} from "../actions";

export default function projects(state = [], action = {}) {
    switch (action.type) {
        case SET_PROJECTS:
            return action.payload;
        default:
            return state;
    }
};