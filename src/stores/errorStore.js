import {observable} from "mobx";

class ErrorStore {

    @observable errorText;

    constructor() {
        this.errorText = null;
    }
}

const errorStore = new ErrorStore();

export default errorStore;
export {ErrorStore};