import {SET_SELECTED_PROJECT} from "../actionTypes";

export default function (state = {id: -1}, action = {}) {
    switch (action.type) {
        case SET_SELECTED_PROJECT:
            return action.selectedProject;
        default:
            return state;
    }
};
