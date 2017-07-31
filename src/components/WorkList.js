import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {Button} from "semantic-ui-react";
import _ from "lodash";
import WorkRowForm from "../forms/WorkRowForm";

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

const viewRow = (workRow, onAdd, onDelete, onEdit) => {
    return (
        <tr className={trClassName(workRow)} key={workRow.key}>
            <td className={tdClassName(workRow)}>{workRow.firstRowForDate ? addCell(workRow, onAdd) : ""}</td>
            <td className={tdClassName(workRow)}>{workRow.firstRowForDate ? dateCell(workRow) : ""}</td>
            <td className={tdClassName(workRow)}>{workRow["project-id"]}</td>
            <td className={tdClassName(workRow)}>{workRow.hours}</td>
            <td className={tdClassName(workRow)}>{workRow.comment}</td>
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

const editRow = (workRow, onSave, onAdd) => {
    const key = workRow.key;
    return (
        <WorkRowForm workRow={workRow}
                     addCell={workRow.firstRowForDate ? addCell(workRow, onAdd) : ""}
                     dateCell={workRow.firstRowForDate ? dateCell(workRow) : ""}
                     onSave={onSave}
                     trClassName={trClassName(workRow)}
                     tdClassName={tdClassName(workRow)}
                     form={`WorkRow${key}`}
                     key={key}/>
    );
};

const WorkList = ({rows, onAdd, onDelete, onSave, onEdit}) => {
    const tableRows = _.values(rows)
        .sort((workRow1, workRow2) => {
            if (workRow1.date.isSame(workRow2.date)) {
                return workRow1.row - workRow2.row;
            }
            return workRow1.date.isBefore(workRow2.date) ? -1 : 1;
        })
        .map(workRow => {
            return workRow.editMode ? editRow(workRow, onSave, onAdd) : viewRow(workRow, onAdd, onDelete, onEdit);
        });

    return (
        <table className="ui striped table">
            <thead>
            <tr>
                <th className="minWidthCell"/>
                <th>Date</th>
                <th>Project</th>
                <th>Hours</th>
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

WorkList.propTypes = {
    rows: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default WorkList;
