import _ from "lodash";

import {SET_PROJECTS, SET_PROJECT_CLOAKED} from "../actions";

export default function (state = {}, action = {}) {
    switch (action.type) {
        case SET_PROJECTS:
            return _.mapKeys(action.payload.data, 'id');
        case SET_PROJECT_CLOAKED:
            return { ...state, [action.payload.data.id]: action.payload.data};
        default:
            return state;
    }
};