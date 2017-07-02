import * as ActionTypes from "../actionTypes";

export default function (state = [], action = {}) {
    switch (action.type) {
        case ActionTypes.GET_INVOICING_PROJECTS:
            return action.payload.data;
        default:
            return state;
    }
};
