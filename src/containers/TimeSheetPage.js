import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {fetchWork, setTimesheetDate} from "../actions";
import {Button} from "semantic-ui-react";


class TimeSheetPage extends React.Component {
    componentDidMount() {
        this.props.fetchWork(this.props.user, this.props.timesheetDate);
    }

    onWeekLeft() {
        this.move(-7);
    }
    onMonthLeft() {
        this.move(-28);
    }
    onWeekRight() {
        this.move(7);
    }
    onMonthRight() {
        this.move(28);
    }
    move(days) {
        const newDate = this.props.timesheetDate.clone().add(days, 'days');
        this.props.setTimesheetDate(newDate);
        this.props.fetchWork(this.props.user, newDate);
    }

    render() {
        return (
            <div className="timesheet-page">
                <Button onClick={this.onMonthLeft.bind(this)}
                        className="ui compact icon">
                    <i className="fast backward icon"/>
                </Button>
                <Button onClick={this.onWeekLeft.bind(this)}
                        className="ui compact icon">
                    <i className="step backward icon"/>
                </Button>
                <Button onClick={this.onWeekRight.bind(this)}
                        className="ui compact icon">
                    <i className="step forward icon"/>
                </Button>
                <Button onClick={this.onMonthRight.bind(this)}
                        className="ui compact icon">
                    <i className="fast forward icon"/>
                </Button>
            </div>
        );
    }
}

TimeSheetPage.propTypes = {
    work: PropTypes.object.isRequired,
    fetchWork: PropTypes.func.isRequired,
    setTimesheetDate: PropTypes.func.isRequired
};

function mapStateToProps({auth, work, timesheetDate}) {
    return {
        user: auth.user,
        work,
        timesheetDate
    }
}

export default connect(mapStateToProps, {fetchWork, setTimesheetDate})(TimeSheetPage);
