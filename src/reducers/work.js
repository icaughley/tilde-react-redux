import _ from "lodash";
import * as ActionTypes from "../actionTypes";
import moment from "moment";

export default function (state = {}, action = {}) {
    switch (action.type) {
        case ActionTypes.GET_WORK:
            return buildWeek(action.payload.data, action.extra);
        default:
            return state;
    }
};

function buildWeek(existingWork, startDate) {
    const work = _.mapKeys(existingWork, 'id');
    const values = _.values(work);

    // Convert dates in work to real dates
    _.each(values, (w) => w.date = moment(w.workdate));

    for (var i = 0; i < 7; i++) {
        const day = startDate.clone().add(i, "days");
        if (!_.some(values, (w) => w.date.isSame(day))) {
            work[`New${_.random(9999999999)}`] = {
                row: 0,
                date: day
            };
        }
    }

    return work;
}