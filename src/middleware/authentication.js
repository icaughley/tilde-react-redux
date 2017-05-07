import {LOGIN} from "../actions";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export default store => next => action => {
    if (action.type === LOGIN) {
        const user = action.payload;
        if (user.authenticated) {
            action = {
                type: LOGIN_SUCCESS,
                user
            };
        }
        else {
            action = {
                type: LOGIN_FAIL,
                user: null
            };

        }
    }

    return next(action);
};
