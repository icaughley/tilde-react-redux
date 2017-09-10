import deepFreeze from "deep-freeze";
import reduce from "./work";
import {
    ADD_WORK,
    ADD_WORK_ROW,
    DELETE_WORK,
    DELETE_WORK_ROW,
    EDIT_WORK_ROW,
    GET_WORK,
    UPDATE_WORK
} from "../actionTypes";
import moment from "moment";
import _ from "lodash";
import {sortRows} from "../helpers/workRowHelper";

describe('Work reducer', () => {

    const from = moment("2017-07-16T14:00:00.000Z");
    const to = moment("2017-07-29T14:00:00.000Z");
    const range = {from, to};

    const data1 = {
        id: 36939,
        "user-id": 4,
        "project-id": 136,
        day: 0,
        week: 49,
        year: 2016,
        hours: 2.5,
        comment: "",
        date: from,
        workdate: from,
        "invoice-number": "NAFC029"
    };

    const data2 = {
        id: 36940,
        "user-id": 4,
        "project-id": 135,
        day: 0,
        week: 49,
        year: 2016,
        hours: 30,
        comment: "Here is a comment",
        date: from,
        workdate: from,
        "invoice-number": null
    };

    const sortedRows = (rows) => _.values(rows).sort(sortRows);

    it('provides the initial state ', () => {
        expect(reduce()).toEqual({range: {}, rows: {}});
    });

    it('ignores unrecognised actions', () => {
        expect(reduce({}, {type: 'UNRECOGNISED'})).toEqual({});
    });

    it('handles action of type GET_WORK with no work', () => {
        const action = {type: GET_WORK, payload: {data: []}, extra: range};
        const state = {rows: [data1, data2], range};

        deepFreeze(state);
        deepFreeze(action);

        const newState = reduce(state, action);
        expect(newState.range).toEqual(range);
        expect(_.values(newState.rows).length).toEqual(14);

        const rows = sortedRows(newState.rows);
        const firstRow = rows[0];
        expect(firstRow.date).toEqual(from);
        expect(firstRow.firstRowForDate).toEqual(true);
        expect(firstRow.editMode).toEqual(true);
        expect(firstRow.key).toMatch(/New.*/);

        const secondRow = rows[1];
        expect(secondRow.key).not.toEqual(firstRow.key);
    });

    it('handles action of type GET_WORK with some work', () => {
        const action = {type: GET_WORK, payload: {data: [data1, data2]}, extra: range};
        const state = {};

        deepFreeze(state);
        deepFreeze(action);

        const newState = reduce(state, action);
        expect(newState.range).toEqual(range);

        // The two data rows are on the same day, so we should have 15
        expect(_.values(newState.rows).length).toEqual(15);

        const rows = sortedRows(newState.rows);

        const firstRow = rows[0];
        expect(firstRow.date).toEqual(from);
        expect(firstRow.firstRowForDate).toEqual(true);
        expect(firstRow.editMode).toEqual(false);
        expect(firstRow.key).toEqual(data1.id);
        expect(firstRow.hours).toEqual(data1.hours);
        expect(firstRow["user-id"]).toEqual(data1["user-id"]);
        expect(firstRow["project-id"]).toEqual(data1["project-id"]);
        expect(firstRow["invoice-number"]).toEqual(data1["invoice-number"]);

        const secondRow = rows[1];
        expect(secondRow.date).toEqual(from);
        expect(secondRow.firstRowForDate).toEqual(false);
        expect(secondRow.editMode).toEqual(false);
        expect(secondRow.key).toEqual(data2.id);
        expect(secondRow.hours).toEqual(data2.hours);
        expect(secondRow["user-id"]).toEqual(data2["user-id"]);
        expect(secondRow["project-id"]).toEqual(data2["project-id"]);
        expect(secondRow["invoice-number"]).toEqual(data2["invoice-number"]);
    });

    it('handles action of type ADD_WORK_ROW', () => {
        const action = {type: ADD_WORK_ROW, date: from};
        const state = {rows: {}, range};
        state.rows[data1.id] = {...data1, date: from};
        state.rows[data2.id] = {...data2, date: from};

        deepFreeze(state);
        deepFreeze(action);

        const newState = reduce(state, action);
        expect(newState.range).toEqual(range);

        expect(_.values(newState.rows).length).toEqual(3);

        const rows = sortedRows(newState.rows);

        const lastRow = rows[2];
        expect(lastRow.date).toEqual(from);
        expect(lastRow.firstRowForDate).toEqual(false);
        expect(lastRow.editMode).toEqual(true);
        expect(lastRow.key).toMatch(/New.*/);
    });

    it('handles action of type EDIT_WORK_ROW', () => {
        const action = {type: EDIT_WORK_ROW, key: data1.id};
        const state = {rows: {}, range};
        state.rows[data1.id] = {...data1, editMode: false};
        state.rows[data2.id] = {...data2, editMode: false};

        deepFreeze(state);
        deepFreeze(action);

        const newState = reduce(state, action);
        expect(_.values(newState.rows).length).toEqual(2);

        expect(newState.rows[data1.id].editMode).toEqual(true);
        expect(newState.rows[data2.id].editMode).toEqual(false);
    });

    it('handles action of type DELETE_WORK_ROW', () => {
        const action = {type: DELETE_WORK_ROW, payload: {data: data1}};
        const state = {rows: {}, range};
        state.rows[data1.id] = data1;
        state.rows[data2.id] = data2;

        deepFreeze(state);
        deepFreeze(action);

        const newState = reduce(state, action);

        // Expect 14 rows. Calling delete also populates missing rows. Would have been 15 if we didn't delete.
        expect(_.values(newState.rows).length).toEqual(14);

        expect(newState.rows[data1.id]).not.toBeDefined();
        expect(newState.rows[data2.id]).toBeDefined();
    });

    it('handles action of type DELETE_WORK', () => {
        const action = {type: DELETE_WORK, payload: {data: data1}};
        const state = {rows: {}, range};
        state.rows[data1.id] = data1;
        state.rows[data2.id] = data2;

        deepFreeze(state);
        deepFreeze(action);

        const newState = reduce(state, action);

        // Expect 14 rows. Calling delete also populates missing rows. Would have been 15 if we didn't delete.
        expect(_.values(newState.rows).length).toEqual(14);

        expect(newState.rows[data1.id]).not.toBeDefined();
        expect(newState.rows[data2.id]).toBeDefined();
    });

    it('handles action of type UPDATE_WORK', () => {
        const updatedRow = {...data1, comment: "worked"};

        const action = {type: UPDATE_WORK, payload: {data: updatedRow}};
        const state = {rows: {}, range};
        state.rows[data1.id] = data1;
        state.rows[data2.id] = data2;

        deepFreeze(state);
        deepFreeze(action);

        const newState = reduce(state, action);
        expect(_.values(newState.rows).length).toEqual(2);

        const rows = sortedRows(newState.rows);
        const firstRow = rows[0];
        expect(firstRow.id).toEqual(updatedRow.id);
        expect(firstRow.comment).toEqual("worked");
    });

    it('handles action of type ADD_WORK', () => {
        const key = "New0000001";
        const blankRow = {key, date: to};
        const addedRow = {...data2, key};

        const action = {type: ADD_WORK, payload: {data: addedRow}};
        const state = {rows: {}, range};
        state.rows[data1.id] = data1;
        state.rows[key] = blankRow;
        deepFreeze(state);
        deepFreeze(action);

        const newState = reduce(state, action);
        expect(_.values(newState.rows).length).toEqual(2);

        const rows = sortedRows(newState.rows);
        const firstRow = rows[0];
        expect(firstRow.id).toEqual(data1.id);

        const secondRow = rows[1];
        expect(secondRow.id).toEqual(data2.id);
        expect(secondRow.date).toEqual(from);
        expect(secondRow.firstRowForDate).toEqual(false);
        expect(secondRow.editMode).toEqual(false);
        expect(secondRow.key).toEqual(data2.id);
        expect(secondRow.hours).toEqual(data2.hours);
        expect(secondRow["user-id"]).toEqual(data2["user-id"]);
        expect(secondRow["project-id"]).toEqual(data2["project-id"]);
        expect(secondRow["invoice-number"]).toEqual(data2["invoice-number"]);
    });
});
