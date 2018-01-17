import React, {Component} from "react";
import {push} from "react-router-redux";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {fetchBillableProjects, logout} from "../actions";

class Nav extends Component {
    toTimeSheet = () => {
        this.props.push('timeSheet');
    };
    toProjects = () => {
        this.props.push('projects');
    };
    toInvoicing = () => {
        this.props.push('invoicing')
    };
    toPayroll = () => {
        this.props.push('payroll');
    };

    render() {
        return (
            <div>
                <div className="menu">
                    <span>Welcome <strong>{this.props.auth.user.name}</strong></span>
                    <span className="menu-right">
                    <a href="#" onClick={this.toTimeSheet}>Time Sheet</a>
                    <a href="#" onClick={this.toProjects}>Projects</a>
                    <a href="#" onClick={this.toInvoicing}>Invoicing</a>
                    <a href="#" onClick={this.toPayroll}>Payroll</a>
                    <a href="#" onClick={this.props.logout}>Log Out</a>
                </span>
                </div>
            </div>
        );
    }
}

Nav.propTypes = {
    auth: PropTypes.object,
    logout: PropTypes.func.isRequired
};

function mapStateToProps({auth}) {
    return {
        auth
    }
}

export default connect(mapStateToProps, {push, logout})(Nav);
