import _ from "lodash";
import * as ActionTypes from "../actionTypes";
import moment from "moment";
import {sortRows} from "../helpers/workRowHelper";

const sortedRows = (rows) => _.values(rows).sort(sortRows);

export default function (state = {range: {}, rows: {}}, action = {}) {
    switch (action.type) {
        case ActionTypes.GET_WORK:
            return handleGetWork(action);
        case ActionTypes.ADD_WORK_ROW:
            return handleAddNewRow(state, action);
        case ActionTypes.EDIT_WORK_ROW:
            return handleEditRow(state, action);
        case ActionTypes.DELETE_WORK_ROW:
        case ActionTypes.DELETE_WORK:
            return handleDeleteRow(state, action);
        case ActionTypes.ADD_WORK:
            return handleAddWork(state, action);
        case ActionTypes.UPDATE_WORK:
            return handleUpdateWork(state, action);
        default:
            return state;
    }
};

function handleAddNewRow(state, action) {
    const row = {
        key: newKey(),
        date: action.date,
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
    const rows = _.mapKeys(_.map(action.payload.data, w => convertToViewModel(w)), 'id');

    fillMissingDaysWithEmptyRows(rows, range);
    setFirstRowForDateFields(rows);

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

function handleAddWork(state, action) {
    const newRow = action.payload.data;

    const newState = {
        range: {...state.range},
        rows: _.cloneDeep(state.rows)
    };

    delete newState.rows[newRow.key];

    newState.rows[newRow.id] = convertToViewModel(newRow);

    setFirstRowForDateFields(newState.rows);

    return newState;
}

function handleUpdateWork(state, action) {
    const updatedRow = action.payload.data;

    const newState = {
        range: {...state.range},
        rows: _.cloneDeep(state.rows)
    };

    newState.rows[updatedRow.id] = convertToViewModel(updatedRow);
    return newState;
}

function handleDeleteRow(state, action) {
    const row = action.payload.data;
    const key = row.key || row.id;
    const newState = {
        range: {...state.range},
        rows: _.cloneDeep(state.rows)
    };
    delete newState.rows[key];

    fillMissingDaysWithEmptyRows(newState.rows, state.range);
    setFirstRowForDateFields(newState.rows);

    return newState;
}

// Adds some extra fields required client side.
function convertToViewModel(w) {
    // Clone the object so that we can extend it.
    return {
        ...w,
        date: moment(w.workdate),
        key: w.id,
        editMode: false
    };
}

// Loops over the rows and works out which is the first one for each date, and then sets the firstRowForDate field.
function setFirstRowForDateFields(rows) {
    let d = null;
    _.each(sortedRows(rows), (row) => {
        row.firstRowForDate = !row.date.isSame(d);
        d = row.date;
    });
}

function fillMissingDaysWithEmptyRows(rows, range) {
    const values = _.values(rows);
    const numDays = range.to.diff(range.from, "days") + 1;

    for (let i = 0; i < numDays; i++) {
        const date = range.from.clone().add(i, "days");
        if (!_.some(values, w => w.date.isSame(date))) {
            const key = newKey();
            rows[key] = {
                editMode: true,
                date,
                key
            };
        }
    }
}

let keyCounter = 0;
function newKey() {
    keyCounter++;
    return `New${_.padStart("" + keyCounter, 6, "0")}`;
}


