import * as ActionTypes from "../actionTypes";

export default function (state = {}, action = {}) {
    switch (action.type) {
        case ActionTypes.UPDATE_PROJECT:
            return {type: 'success', msg: 'Project updated.'};
        case ActionTypes.CREATE_PROJECT:
            return {type: 'success', msg: 'Project created.'};
        default:
            return state;
    }
};