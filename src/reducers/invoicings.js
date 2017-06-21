import {SET_INVOICING} from "../actions";

export default function (state = [], action = {}) {
    switch (action.type) {
        case SET_INVOICING:
            return action.payload;
        default:
            return state;
    }
};