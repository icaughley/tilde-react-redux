import callServer from "./callServer";
import invoicingEntryStore from "../stores/invoicingEntryStore";
import projectStore from "../stores/projectStore";
import _ from "lodash";

export function fetchInvoicingEntries(project) {
    projectStore.selectedProjectId = project.id;
    callServer('get', `/api/invoicing/entries/${project.id}`, null, payload => {
        invoicingEntryStore.entries = _.mapKeys(payload, 'id');
    });
}
