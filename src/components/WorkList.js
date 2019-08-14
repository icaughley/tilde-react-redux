import React from "react";
import {observer} from "mobx-react";
import moment from "moment";
import {Button} from "semantic-ui-react";
import EditableWorkRow from "./EditableWorkRow";
import {sortRows} from "../helpers/workRowHelper";

const TODAY = moment().startOf("day");

const trClassName = (workRow) => {
    return workRow.firstRowForDate ? "firstRow" : "";
};

const tdClassName = (workRow) => {
    if (workRow.date.isSame(TODAY)) {
        return "today";
    }
    if (workRow.date.isoWeekday() > 5) {
        return "weekend";
    }

    return "";
};

const addCell = (workRow, onAdd) => (
    <Button type="button"
            onClick={onAdd.bind(null, workRow)}
            className="ui compact icon">
        <i className="add icon"/>
    </Button>
);

const dateCell = (workRow, onAdd) => (
    <span>
        {workRow.date.format('YYYY-MM-DD')}
    </span>
);

const viewRow = (workRow, onAdd, onDelete, onEdit, projects) => {
    return (
        <tr className={trClassName(workRow)} key={workRow.key}>
            <td className={tdClassName(workRow)}>{workRow.firstRowForDate ? addCell(workRow, onAdd) : ""}</td>
            <td className={tdClassName(workRow)}>{workRow.firstRowForDate ? dateCell(workRow) : ""}</td>
            <td className={tdClassName(workRow) + "viewModeSelect"}>{projects.get(workRow.projectId) ? projects.get(workRow.projectId).name : ""}</td>
            <td className={tdClassName(workRow) + "viewModeField"}>{workRow.hours}</td>
            <td className={tdClassName(workRow) + "viewModeField"}>{workRow.comment}</td>
            <td className={tdClassName(workRow)}>
                <Button.Group>
                    <Button type="button"
                            onClick={onEdit.bind(null, workRow)}
                            className="ui compact icon">
                        <i className="edit icon"/>
                    </Button>
                    <Button type="button"
                            onClick={onDelete.bind(null, workRow)}
                            className="ui compact icon">
                        <i className="red trash outline icon"/>
                    </Button>
                </Button.Group>
            </td>
        </tr>
    );
};

const editRow = (workRow, onSave, onCancel, onAdd, projectOptions) => {
    const key = workRow.key;
    return (
        <EditableWorkRow initialValues={workRow}
                         projectOptions={projectOptions}
                         addCell={workRow.firstRowForDate ? addCell(workRow, onAdd) : ""}
                         dateCell={workRow.firstRowForDate ? dateCell(workRow) : ""}
                         onSave={onSave}
                         onCancel={onCancel}
                         trClassName={trClassName(workRow)}
                         tdClassName={tdClassName(workRow)}
                         form={`WorkRow${key}`}
                         key={key}
                         rowKey={key}/>
    );
};

const WorkList = ({rows, onAdd, onDelete, onSave, onEdit, projectOptions, projects}) => {
    const tableRows = rows.values().sort(sortRows)
        .map(workRow => {
            return workRow.editMode ?
                editRow(workRow, onSave, onDelete, onAdd, projectOptions) :
                viewRow(workRow, onAdd, onDelete, onEdit, projects);
        });

    return (
        <table className="ui striped table">
            <thead>
            <tr>
                <th className="minWidthCell"/>
                <th>Date</th>
                <th>Project</th>
                <th className="hoursField">Hours</th>
                <th>Comment</th>
                <th className="minWidthCell"/>
            </tr>
            </thead>
            <tbody>
            {tableRows}
            </tbody>
        </table>
    );
};

export default observer(WorkList);
