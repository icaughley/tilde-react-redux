import _ from "lodash";
import * as ActionTypes from "../actionTypes";

export default function (state = {}, action = {}) {

    if (_.endsWith(action.type, ActionTypes.ERROR_SUFFIX)) {
        console.log(JSON.stringify(action.payload));
        return {type: 'error', msg: action.payload.statusText}
    }

    switch (action.type) {
        case ActionTypes.UPDATE_PROJECT:
            return {type: 'success', msg: 'Project updated.'};
        case ActionTypes.CREATE_PROJECT:
            return {type: 'success', msg: 'Project created.'};
        case ActionTypes.DELETE_PROJECT:
            return {type: 'success', msg: 'Project deleted.'};
        default:
            return state;
    }
};