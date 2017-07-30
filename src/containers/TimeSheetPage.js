import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import WorkList from "../components/WorkList";
import TimeSheetControls from "../components/TimeSheetControls";
import {addWorkRow, deleteWorkRow, fetchWork, editWorkRow} from "../actions";


class TimeSheetPage extends React.Component {
    defaultStartDate() {
        return moment().startOf('isoWeek').subtract(7, "days");
    }

    componentDidMount() {
        this.props.fetchWork(this.props.user, this.props.work.range.from || this.defaultStartDate());
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

    onSave = (a, b, c, d, e) => {
        alert("Save!");
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
        console.log(e);
    };

    move(days) {
        const newDate = this.props.work.range.from.clone().add(days, 'days');
        this.props.fetchWork(this.props.user, newDate);
    }

    render() {
        return (
            <div className="timesheet-page">
                <TimeSheetControls onWeekLeft={this.onWeekLeft}
                                   onMonthLeft={this.onMonthLeft}
                                   onToday={this.onToday}
                                   onWeekRight={this.onWeekRight}
                                   onMonthRight={this.onMonthRight}/>
                <WorkList rows={this.props.work.rows}
                          onSave={this.onSave}
                          onAdd={this.onAdd}
                          onEdit={this.onEdit}
                          onDelete={this.onDelete}/>
            </div>
        );
    }
}

TimeSheetPage.propTypes = {
    work: PropTypes.object.isRequired,
    fetchWork: PropTypes.func.isRequired,
    addWorkRow: PropTypes.func.isRequired,
    editWorkRow: PropTypes.func.isRequired,
    deleteWorkRow: PropTypes.func.isRequired
};

function mapStateToProps({auth, work, timesheetDate}) {
    return {
        user: auth.user,
        work,
        timesheetDate
    }
}

export default connect(mapStateToProps, {fetchWork, addWorkRow, deleteWorkRow, editWorkRow})(TimeSheetPage);
