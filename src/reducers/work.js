import _ from "lodash";
import * as ActionTypes from "../actionTypes";
import moment from "moment";

export default function (state = {range:{},days:{}}, action = {}) {
    switch (action.type) {
        case ActionTypes.GET_WORK:
            const range = action.extra;
            return {range, days: buildDays(action.payload.data, range) };
        default:
            return state;
    }
};

function buildDays(existingWork, range) {
    const work = _.mapKeys(existingWork, 'id');
    const values = _.values(work);

    // Convert dates in work to real dates
    _.each(values, w => w.date = moment(w.workdate));
    const numDays = range.to.diff( range.from, "days" ) + 1;

    for (let i = 0; i < numDays; i++) {
        const day = range.from.clone().add(i, "days");
        if (!_.some(values, w => w.date.isSame(day))) {
            const random = `New${_.random(9999999999)}`;
            work[random] = {
                row: 0,
                date: day,
                random
            };
        }
    }

    return work;
}