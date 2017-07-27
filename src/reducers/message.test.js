import deepFreeze from "deep-freeze"
import reduce from "./message";
import {OPEN_MESSAGE, CLOSE_MESSAGE} from "../actionTypes";

test('provides the initial state', () => {
    expect(reduce()).toEqual({});
});

test('ignores unrecognised actions', () => {
    expect(reduce({}, {type: 'UNRECOGNISED'})).toEqual({});
});

test('handles action of type OPEN_MESSAGE with success message', () => {
    const action = {type: OPEN_MESSAGE, payload: {type: "success", msg: "The message"}};
    const state = {};

    deepFreeze( state );

    expect(reduce(state, action))
        .toEqual({
            open: true,
            icon: "check circle",
            header: "Success",
            type: "success",
            msg: "The message"
        });
});

test('handles action of type OPEN_MESSAGE with error message', () => {
    const action = {type: OPEN_MESSAGE, payload: {type: "error", msg: "The message"}};
    const state = {};

    deepFreeze( state );

    expect(reduce(state, action))
        .toEqual({
            open: true,
            icon: "warning sign",
            header: "Error",
            type: "error",
            msg: "The message"
        });
});

test('handles action of type CLOSE_MESSAGE', () => {
    const action = {type: CLOSE_MESSAGE, payload: {type: "success", msg: "The message"}};
    const state = {
        open: true,
        icon: "warning sign",
        header: "Error",
        type: "error",
        msg: "The message"
    };

    deepFreeze( state );

    expect(reduce(state, action))
        .toEqual({
            open: false,
            icon: "warning sign",
            header: "Error",
            type: "error",
            msg: "The message"
        });
});
