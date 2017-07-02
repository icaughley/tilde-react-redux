import _ from "lodash";
import * as ActionTypes from "../actionTypes";

export default function (state = {}, action = {}) {
    switch (action.type) {
        case ActionTypes.GET_PROJECTS:
            return _.mapKeys(action.payload.data, 'id');
        case ActionTypes.SET_PROJECT_CLOAKED:
        case ActionTypes.UPDATE_PROJECT:
        case ActionTypes.CREATE_PROJECT:
            return {...state, [action.payload.data.id]: action.payload.data};
        case ActionTypes.DELETE_PROJECT:
            return _.omit(state, action.payload.data.id);
        default:
            return state;
    }
};