import _ from "lodash";
import * as ActionTypes from "../actionTypes";
import moment from "moment";


export default function (state = {range: {}, rows: {}}, action = {}) {
    switch (action.type) {
        case ActionTypes.GET_WORK:
            return handleGetWork(action);
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
        firstRowForDate: false,
        editMode: true
    };
    const newState = {
        range: {...state.range},
        rows: {...state.rows}
    };
    newState.rows[row.key] = row;
    return newState;
}

function handleGetWork(action) {
    const range = action.extra;

    // Copy the data from the action into a new "rows" object.
    const rows = _.mapKeys(_.map(action.payload.data, w => {return {...w};}), 'id');
    const values = _.values(rows);

    // Convert dates in work to real dates
    _.each(values, w => {
        w.date = moment(w.workdate);
        w.key = w.id;
        w.editMode = false;
    });

    const numDays = range.to.diff(range.from, "days") + 1;

    for (let i = 0; i < numDays; i++) {
        const date = range.from.clone().add(i, "days");
        if (!_.some(values, w => w.date.isSame(date))) {
            const key = newRandom();
            rows[key] = {
                row: 0,
                editMode: true,
                date,
                key
            };
        }
    }

    let d = null;
    _.each(sortedRows(rows), (row) => {
        row.firstRowForDate = !row.date.isSame(d);
        d = row.date;
    });

    return {range, rows};
}

function handleEditRow(state, action) {
    const newState = {
        range: {...state.range},
        rows: _.cloneDeep(state.rows)
    };
    newState.rows[action.key].editMode = true;
    return newState;
}

function handleDeleteRow(state, action) {
    const row = action.payload.data;
    const key = row.key || row.id;
    const newState = {
        range: {...state.range},
        rows: {...state.rows}
    };
    delete newState.rows[key];
    return newState;
}

function newRandom() {
    return `New${_.random(9999999999)}`;
}

const sortedRows = (rows) =>
    _.values(rows)
        .sort((workRow1, workRow2) => {
            if (workRow1.date.isSame(workRow2.date)) {
                return workRow1.row - workRow2.row;
            }
            return workRow1.date.isBefore(workRow2.date) ? -1 : 1;
        });

