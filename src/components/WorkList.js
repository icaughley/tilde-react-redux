import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import _ from "lodash";

const TODAY = moment().startOf("day");

const trClassName = (work) => {
    return work.row === 0 ? "row0" : "";
};

const tdClassName = (work) => {
    console.log("" + work.date.isoWeekday() + ": " + (work.date.isoWeekday() > 5 ));
    if (work.date.isSame(TODAY)) {
        return "today";
    }
    if (work.date.isoWeekday() > 5) {
        return "weekend";
    }

    return "";
};

const WorkList = ({days}) => {
    const rows = _.values(days)
        .sort((w1, w2) => {
            if (w1.date.isSame(w2.date)) {
                return w1.row - w2.row;
            }
            return w1.date.isBefore(w2.date) ? -1 : 1;
        })
        .map(w => {
            return (
                <tr className={trClassName(w)} key={w.id || w.random}>
                    <td className={tdClassName(w)}>{w.row === 0 ? w.date.format('YYYY-MM-DD') : ""}</td>
                    <td className={tdClassName(w)}>{w["project-id"]}</td>
                    <td className={tdClassName(w)}>{w.hours}</td>
                    <td className={tdClassName(w)}>{w.comment}</td>
                    <td className={tdClassName(w)}/>
                </tr>
            )
        });

    return (
        <table className="ui striped table">
            <thead>
            <tr>
                <th>Date</th>
                <th>Project</th>
                <th>Hours</th>
                <th>Comment</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    );
};

WorkList.propTypes = {
    work: PropTypes.object.isRequired
};

export default WorkList;