import _ from "lodash";
import * as ActionTypes from "../actionTypes";

export default function (state = {}, action = {}) {
    switch (action.type) {
        case ActionTypes.GET_INVOICING:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
};
