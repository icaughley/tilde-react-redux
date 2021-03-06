import React from "react";
import _ from "lodash";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import WorkList from "../components/WorkList";
import TimeSheetControls from "../components/TimeSheetControls";
import {addWorkRow, deleteWorkRow, editWorkRow, fetchProjects, fetchWork, saveWorkRow} from "../actions";


class TimeSheetPage extends React.Component {
    defaultStartDate() {
        return moment().startOf('isoWeek').subtract(7, "days");
    }

    componentDidMount() {
        this.props.fetchWork(this.props.user, this.props.work.range.from || this.defaultStartDate());
        this.props.fetchProjects(this.props.user);
    }

    onWeekLeft = () => {
        this.move(-7);
    };

    onMonthLeft = () => {
        this.move(-28);
    };

    onWeekRight = () => {
        this.move(7);
    };

    onMonthRight = () => {
        this.move(28);
    };

    onToday = () => {
        this.props.fetchWork(this.props.user, this.defaultStartDate());
    };

    onAdd = (workRow) => {
        this.props.addWorkRow(workRow.date);
    };

    onDelete = (workRow) => {
        this.props.deleteWorkRow(workRow);
    };

    onEdit = (workRow) => {
        this.props.editWorkRow(workRow);
    };

    onSave = (workRow) => {
        this.props.saveWorkRow(this.props.user, workRow);
    };

    move(days) {
        const newDate = this.props.work.range.from.clone().add(days, 'days');
        this.props.fetchWork(this.props.user, newDate);
    }

    render() {
        return (
            <div id="timesheet-page">
                <div className="page-heading">
                    <h1 className="ui ribbon label">Time Sheet</h1>
                    <TimeSheetControls onWeekLeft={this.onWeekLeft}
                                       onMonthLeft={this.onMonthLeft}
                                       onToday={this.onToday}
                                       onWeekRight={this.onWeekRight}
                                       onMonthRight={this.onMonthRight}/>
                </div>
                <div>
                    <WorkList rows={this.props.work.rows}
                              usersProjects={this.props.usersProjects}
                              projects={this.props.projects}
                              onSave={this.onSave}
                              onAdd={this.onAdd}
                              onEdit={this.onEdit}
                              onDelete={this.onDelete}/>
                </div>
            </div>
        );
    }
}

TimeSheetPage.propTypes = {
    work: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired,
    usersProjects: PropTypes.array.isRequired,
    fetchWork: PropTypes.func.isRequired,
    addWorkRow: PropTypes.func.isRequired,
    editWorkRow: PropTypes.func.isRequired,
    deleteWorkRow: PropTypes.func.isRequired
};

function mapStateToProps({auth, work, timesheetDate, projects}) {
    const uncloakedProjects = _.pickBy(projects, p => !p.cloaked);
    const usersProjects = _.values(uncloakedProjects).map(p => {
        return {value: p.id, text: p.name}
    });

    return {
        user: auth.user,
        work,
        timesheetDate,
        usersProjects: usersProjects.sort((p1, p2) => p1.text.localeCompare(p2.text)),
        projects
    }
}

export default connect(mapStateToProps, {
    fetchWork,
    fetchProjects,
    addWorkRow,
    saveWorkRow,
    deleteWorkRow,
    editWorkRow
})(TimeSheetPage);
