import {observable} from "mobx";

class InvoicingEntryStore {

    @observable entries;

    constructor() {
        this.entries = {};
    }
}

export default new InvoicingEntryStore();
