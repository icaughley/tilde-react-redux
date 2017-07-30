import _ from "lodash";
import * as ActionTypes from "../actionTypes";
import moment from "moment";


export default function (state = {range: {}, rows: {}}, action = {}) {
    switch (action.type) {
        case ActionTypes.GET_WORK:
            return handleGetWork(state, action);
        case ActionTypes.ADD_WORK_ROW:
            return handleAddNewRow(state, action);
        case ActionTypes.EDIT_WORK_ROW:
            return handleEditRow(state, action);
        case ActionTypes.DELETE_WORK_ROW:
            return handleDeleteRow(state, action);
        default:
            return state;
    }
};

function handleAddNewRow(state, action) {
    const nextRowNum = _.values(state.rows)
            .filter(d => d.date.isSame(action.date))
            .reduce((max, d) => d.row > max ? d.row : max, 0) + 1;
    const row = {
        key: newRandom(),
        date: action.date,
        row: nextRowNum,
        editMode: true
    };
    const newState = {
        range: {...state.range},
        rows: {...state.rows}
    };
    newState.rows[row.key] = row;
    return newState;
}

function handleGetWork(state, action) {
    const range = action.extra;
    const rows = _.mapKeys(action.payload.data, 'id');
    const values = _.values(rows);

    // Convert dates in work to real dates
    _.each(values, w => w.date = moment(w.workdate));
    _.each(values, w => w.key = w.id);
    const numDays = range.to.diff(range.from, "days") + 1;

    for (let i = 0; i < numDays; i++) {
        const date = range.from.clone().add(i, "days");
        if (!_.some(values, w => w.date.isSame(date))) {
            const key = newRandom();
            rows[key] = {
                row: 0,
                date,
                key
            };
        }
    }

    let d = null;
    _.each(rows, (row) => {
        row.firstRowForDate = !row.date.isSame(d);
        d = row.date;
    });

    return {range, rows};
}

function handleEditRow(state, action) {
    const newState = {
        range: {...state.range},
        rows: {...state.rows}
    };
    newState.rows[action.key].editMode = true;
    return newState;
}

function handleDeleteRow(state, action) {
    const row = action.payload.data;
    const newState = {
        range: {...state.range},
        rows: {...state.rows}
    };
    delete newState.rows[row.key];
    return newState;
}

function newRandom() {
    return `New${_.random(9999999999)}`;
}
