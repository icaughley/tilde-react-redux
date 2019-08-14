import callServer from "./callServer";
import workStore from "../stores/workStore";

const DATE_FORMAT = 'YYYY-MM-DD';

// date should be a moment
export function fetchWork(user, from) {
    const fromParam = from.format(DATE_FORMAT);
    const to = from.clone().add(13, 'd');
    const toParam = to.format(DATE_FORMAT);
    const range = {from, to};

    callServer('get', `/api/users/${user.id}/work?from=${fromParam}&to=${toParam}`, null, payload => {
        workStore.replaceAll(payload, range);
    });
}

export function editWorkRow(row) {
    workStore.editWorkRow(row);
}

export function deleteWorkRow(row) {
    if (row.id) {
        callServer('delete', `/api/work/${row.id}`, null, payload => {
            workStore.deleteWorkRow(payload)
        });
    }
    else {
        workStore.deleteWorkRow(row)
    }
}

export function saveWorkRow(user, workRow) {
    const commentParam = workRow.comment || "";
    if (workRow.id) {
        return updateWork(workRow.id, workRow.projectId, workRow.hours, commentParam);
    }
    else {
        const dateParam = workRow.date.format(DATE_FORMAT);
        return addWork(user.id, workRow.key, workRow.projectId, dateParam, workRow.hours, commentParam);
    }
}

function addWork(userId, key, projectId, workDate, hours, comment) {

console.log( "addWork(userId:"+userId+", key:"+key+", projectId:"+projectId+", workDate:"+workDate+", hours:"+hours+", comment:"+comment+")" );


    callServer('post', '/api/work',
        {
            userID: userId,
            key,
            projectID: projectId,
            workDate,
            hours,
            comment
        },
        payload => {
            workStore.addOrReplaceWorkRow(payload);
        });
}

function updateWork(workId, projectId, hours, comment) {
    callServer('put', '/api/work/' + workId,
        {
            projectID: projectId,
            hours,
            comment
        },
        payload => {
            workStore.addOrReplaceWorkRow(payload);
        });
}
