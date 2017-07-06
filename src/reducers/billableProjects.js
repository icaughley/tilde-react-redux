import _ from "lodash";
import {GET_BILLABLE_PROJECTS} from "../actionTypes";

export default function (state = {}, action = {}) {
    switch (action.type) {
        case GET_BILLABLE_PROJECTS:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
};
