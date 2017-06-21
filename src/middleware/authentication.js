import {LOGIN} from "../actions";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export default store => next => action => {
    if (action.type === LOGIN) {
        const auth = action.payload.data;
        if (auth.authenticated) {
            action = {
                type: LOGIN_SUCCESS,
                auth
            };
        }
        else {
            action = {
                type: LOGIN_FAIL,
                auth: null
            };

        }
    }

    return next(action);
};
