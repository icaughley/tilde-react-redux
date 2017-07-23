import React from "react";
import PropTypes from "prop-types";
import {Button} from "semantic-ui-react";

const TimeSheetControls = ({onMonthLeft, onWeekLeft, onToday, onWeekRight, onMonthRight}) => {
    return (
    <Button.Group>
        <Button onClick={onMonthLeft}
                className="ui compact icon">
            <i className="fast backward icon"/>
        </Button>
        <Button onClick={onWeekLeft}
                className="ui compact icon">
            <i className="step backward icon"/>
        </Button>
        <Button onClick={onToday}
                className="ui compact icon">
            <i className="calendar outline icon"/>
        </Button>
        <Button onClick={onWeekRight}
                className="ui compact icon">
            <i className="step forward icon"/>
        </Button>
        <Button onClick={onMonthRight}
                className="ui compact icon">
            <i className="fast forward icon"/>
        </Button>
    </Button.Group>
    );
};

TimeSheetControls.propTypes = {
    onMonthLeft: PropTypes.func.isRequired,
    onWeekLeft: PropTypes.func.isRequired,
    onToday: PropTypes.func.isRequired,
    onWeekRight: PropTypes.func.isRequired,
    onMonthRight: PropTypes.func.isRequired
};

export default TimeSheetControls;