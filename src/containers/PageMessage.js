import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Message} from "semantic-ui-react";

class PageMessage extends React.Component {
    render() {
        if (this.props.message.type) {
            const messageProps = {};
            messageProps[this.props.message.type] = true;

            return (
                <div className="page-message">
                    <Message {...messageProps}>{this.props.message.msg}</Message>
                </div>
            );
        }
        else {
            return null;
        }
    }
}

PageMessage.propTypes = {
    message: PropTypes.object.isRequired
};

function mapStateToProps({message}) {
    return {
        message
    }
}

export default connect(mapStateToProps)(PageMessage);
