import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export default class WorkList extends React.Component {
    tdClassName(work) {
        return "";
    }

    render() {
        const rows = _.values(this.props.work)
            .sort((w1, w2) => {
                if (w1.date.isSame(w2.date)) {
                    return w2.row - w1.row;
                }
                return w1.date.isBefore(w2.date) ? -1 : 1;
            })
            .map(w => {
                return (
                    <tr key={w.id || w.random}>
                        <td className={this.tdClassName(w)}>{w.date.format('YYYY-MM-DD')}</td>
                        <td className={this.tdClassName(w)}>{w["project-id"]}</td>
                        <td className={this.tdClassName(w)}>{w.hours}</td>
                        <td className={this.tdClassName(w)}>{w.comment}</td>
                        <td className={this.tdClassName(w)}/>
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
    }
}

WorkList.propTypes = {
    work: PropTypes.object.isRequired
};
