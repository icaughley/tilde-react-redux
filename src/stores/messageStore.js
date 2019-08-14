import {observable} from "mobx";
import {action} from "mobx";

const SUCCESS_ICON = "check circle";
const ERROR_ICON = "warning sign";

class MessageStore {

    @observable open;
    @observable icon;
    @observable header;
    @observable type;
    @observable msg;

    constructor() {
        this.open = false;
        this.icon = null;
        this.header = null;
        this.type = null;
        this.msg = null;
    }

    @action error(msg) {
        this.icon = ERROR_ICON;
        this.header = "Error";
        this.type = "error";
        this.msg = msg;

        this.openMessage();
    }

    @action success(msg) {
        this.icon = SUCCESS_ICON;
        this.header = "Success";
        this.type = "success";
        this.msg = msg;

        this.openMessage();
    }

    @action close() {
        this.open = false;
    }

    openMessage() {
        this.open = true;
        setTimeout(() => this.open = false, 3000);
    }
}

export default new MessageStore();

// export default store => next => action => {
//
//     // TODO: make this work off the errorStore
//     if (_.endsWith(action.type, ActionTypes.ERROR_SUFFIX)) {
//         return openMessage(store, 'error', action.payload ? action.payload.statusText : 'Error contacting server');
//     }
//     else {
//         switch (action.type) {
//             case ActionTypes.UPDATE_PROJECT:
//                 openMessage(store, 'success', 'Project updated.');
//                 break;
//             case ActionTypes.CREATE_PROJECT:
//                 openMessage(store, 'success', 'Project created.');
//                 break;
//             case ActionTypes.DELETE_PROJECT:
//                 openMessage(store, 'success', 'Project deleted.');
//                 break;
//             default:
//         }
//     }
//
//     return next(action);
// };
