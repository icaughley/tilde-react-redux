import {SET_TIMESHEET_DATE} from "../actionTypes";
import moment from 'moment';

export default function (state = moment().startOf('isoWeek'), action = {}) {
    switch (action.type) {
        case SET_TIMESHEET_DATE:
            return action.date;
        default:
            return state;
    }
};
