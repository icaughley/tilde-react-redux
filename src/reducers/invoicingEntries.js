import _ from "lodash";
import {GET_INVOICING} from "../actionTypes";

export default function (state = {}, action = {}) {
    switch (action.type) {
        case GET_INVOICING:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
};
