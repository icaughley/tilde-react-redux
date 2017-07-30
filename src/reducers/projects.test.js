import deepFreeze from "deep-freeze";
import reduce from "./projects";
import {CREATE_PROJECT, DELETE_PROJECT, GET_PROJECTS, SET_PROJECT_CLOAKED, UPDATE_PROJECT} from "../actionTypes";

test('provides the initial state ', () => {
    expect(reduce()).toEqual({});
});

test('ignores unrecognised actions', () => {
    expect(reduce({}, {type: 'UNRECOGNISED'})).toEqual({});
});

test('handles action of type GET_PROJECTS', () => {
    const data1 = {id: 12, name: "a"};
    const data2 = {id: 13, name: "b"};
    const action = {type: GET_PROJECTS, payload: {data: [data1, data2]}};
    const state = {};

    deepFreeze(state);
    deepFreeze(action);

    expect(reduce(state, action)).toEqual({12: data1, 13: data2});
});

test('handles action of type SET_PROJECT_CLOAKED', () => {
    const action = {type: SET_PROJECT_CLOAKED, payload: {data: {id: 12, cloaked: true}}};
    const state = {12: {id: 12, cloaked: false}};

    deepFreeze(state);
    deepFreeze(action);

    expect(reduce(state, action)).toEqual({12: {id: 12, cloaked: true}});
});

test('handles action of type UPDATE_PROJECT', () => {
    const action = {type: UPDATE_PROJECT, payload: {data: {id: 13, name: "Bob"}}};
    const state = {13: {id: 13, name: "Foo"}};

    deepFreeze(state);
    deepFreeze(action);

    expect(reduce(state, action)).toEqual({13: {id: 13, name: "Bob"}});
});

test('handles action of type CREATE_PROJECT', () => {
    const action = {type: CREATE_PROJECT, payload: {data: {id: 14, name: "Bob"}}};
    const state = {};

    deepFreeze(state);
    deepFreeze(action);

    expect(reduce(state, action)).toEqual({14: {id: 14, name: "Bob"}});
});

test('handles action of type DELETE_PROJECT', () => {
    const action = {type: DELETE_PROJECT, payload: {data: {id: 15}}};
    const state = {15: {id: 15, name: "bob"}};

    deepFreeze(state);
    deepFreeze(action);

    expect(reduce(state, action)).toEqual({});
});
