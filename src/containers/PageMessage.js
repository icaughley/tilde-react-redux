import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Icon, Message} from "semantic-ui-react";
import {closeMessage} from "../actions";

class PageMessage extends React.Component {
    render() {
        const className = `page-message ${this.props.message.open ? "open" : "closed"}`;
        const icon = this.props.message.icon ? <Icon name={this.props.message.icon}/> : "";

        const messageProps = {};
        if (this.props.message.type) {
            messageProps[this.props.message.type] = true;
        }

        return (
            <div className={className}>
                <Message icon={true}
                         onDismiss={this.props.closeMessage}
                         {...messageProps}>
                    {icon}
                    <Message.Content>
                        <Message.Header>
                            {this.props.message.header}
                        </Message.Header>
                        {this.props.message.msg}
                    </Message.Content>
                </Message>
            </div>
        );
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

export default connect(mapStateToProps, {closeMessage})(PageMessage);
