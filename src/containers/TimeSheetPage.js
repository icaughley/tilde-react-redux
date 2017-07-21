import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {fetchWork} from "../actions";
import {Button} from "semantic-ui-react";
import WorkList from "../components/WorkList";
import moment from "moment";

class TimeSheetPage extends React.Component {
    defaultStartDate() {
        return moment().startOf('isoWeek').subtract(7, "days");
    }

    componentDidMount() {
        this.props.fetchWork(this.props.user, this.props.work.range.from || this.defaultStartDate());
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

    onToday() {
        this.props.fetchWork(this.props.user, this.defaultStartDate());
    }

    move(days) {
        const newDate = this.props.work.range.from.clone().add(days, 'days');
        this.props.fetchWork(this.props.user, newDate);
    }

    render() {
        return (
            <div className="timesheet-page">
                <Button.Group>
                    <Button onClick={this.onMonthLeft.bind(this)}
                            className="ui compact icon">
                        <i className="fast backward icon"/>
                    </Button>
                    <Button onClick={this.onWeekLeft.bind(this)}
                            className="ui compact icon">
                        <i className="step backward icon"/>
                    </Button>
                    <Button onClick={this.onToday.bind(this)}
                            className="ui compact icon">
                        <i className="calendar outline icon"/>
                    </Button>
                    <Button onClick={this.onWeekRight.bind(this)}
                            className="ui compact icon">
                        <i className="step forward icon"/>
                    </Button>
                    <Button onClick={this.onMonthRight.bind(this)}
                            className="ui compact icon">
                        <i className="fast forward icon"/>
                    </Button>
                </Button.Group>
                <WorkList days={this.props.work.days}/>
            </div>
        );
    }
}

TimeSheetPage.propTypes = {
    work: PropTypes.object.isRequired,
    fetchWork: PropTypes.func.isRequired
};

function mapStateToProps({auth, work, timesheetDate}) {
    return {
        user: auth.user,
        work,
        timesheetDate
    }
}

export default connect(mapStateToProps, {fetchWork})(TimeSheetPage);
