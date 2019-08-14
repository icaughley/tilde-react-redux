import {observable} from "mobx";
import {action} from "mobx";

class AuthStore {

    @observable authenticated;
    @observable token;
    @observable user;

    constructor() {
        this.authenticated = false;
        this.token = null;
        this.user = null;
    }

    @action login(token, user) {
        this.authenticated = true;
        this.token = token;
        this.user = user;
    }

    @action logout() {
        this.authenticated = false;
        this.token = null;
        this.user = null;
    }
}

export default new AuthStore();
