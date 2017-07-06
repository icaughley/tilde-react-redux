import _ from "lodash";
import * as ActionTypes from "../actionTypes";

function openMessage(store, type, msg) {
    setTimeout(() => store.dispatch({type: ActionTypes.CLOSE_MESSAGE}), 3000);

    store.dispatch({
        type: ActionTypes.OPEN_MESSAGE,
        payload: {type, msg}
    });
}

export default store => next => action => {

    if (_.endsWith(action.type, ActionTypes.ERROR_SUFFIX)) {
        return openMessage(store, 'error', action.payload ? action.payload.statusText : 'Error contacting server');
    }
    else {
        switch (action.type) {
            case ActionTypes.UPDATE_PROJECT:
                openMessage(store, 'success', 'Project updated.');
                break;
            case ActionTypes.CREATE_PROJECT:
                openMessage(store, 'success', 'Project created.');
                break;
            case ActionTypes.DELETE_PROJECT:
                openMessage(store, 'success', 'Project deleted.');
                break;
        }
    }

    return next(action);
};
