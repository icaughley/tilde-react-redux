import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

class SecureZone extends Component {
    render() {
        if (this.props.auth) {
            return <div>{this.props.children}</div>;
        } else {
            return <Redirect to="/login"/>;
        }
    }
}

SecureZone.propTypes = {
    auth: PropTypes.object
};

function mapStateToProps({auth}) {
    return {
        auth
    }
}

export default connect(mapStateToProps)(SecureZone);
