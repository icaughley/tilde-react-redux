import deepFreeze from "deep-freeze";
import reduce from "./message";
import {CLOSE_MESSAGE, OPEN_MESSAGE} from "../actionTypes";

describe('Message reducer', () => {
    it('provides the initial state', () => {
        expect(reduce()).toEqual({});
    });

    it('ignores unrecognised actions', () => {
        expect(reduce({}, {type: 'UNRECOGNISED'})).toEqual({});
    });

    it('handles action of type OPEN_MESSAGE with success message', () => {
        const action = {type: OPEN_MESSAGE, payload: {type: "success", msg: "The message"}};
        const state = {};

        deepFreeze(state);
        deepFreeze(action);

        expect(reduce(state, action))
            .toEqual({
                open: true,
                icon: "check circle",
                header: "Success",
                type: "success",
                msg: "The message"
            });
    });

    it('handles action of type OPEN_MESSAGE with error message', () => {
        const action = {type: OPEN_MESSAGE, payload: {type: "error", msg: "The message"}};
        const state = {};

        deepFreeze(state);
        deepFreeze(action);

        expect(reduce(state, action))
            .toEqual({
                open: true,
                icon: "warning sign",
                header: "Error",
                type: "error",
                msg: "The message"
            });
    });

    it('handles action of type CLOSE_MESSAGE', () => {
        const action = {type: CLOSE_MESSAGE, payload: {type: "success", msg: "The message"}};
        const state = {
            open: true,
            icon: "warning sign",
            header: "Error",
            type: "error",
            msg: "The message"
        };

        deepFreeze(state);
        deepFreeze(action);

        expect(reduce(state, action))
            .toEqual({
                open: false,
                icon: "warning sign",
                header: "Error",
                type: "error",
                msg: "The message"
            });
    });
});
