import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../actions";
import "../style/style.css";

class Nav extends Component {
    render() {
        return (
            <div>
                <div className="menu">
                    <span>Welcome <strong>{this.props.auth.user.name}</strong></span>
                    <span className="menu-right">
                    | <Link to="timeSheet">Time Sheet</Link>
                    | <Link to="projects">Projects</Link>
                    | <Link to="invoicing">Invoicing</Link>
                    | <Link to="payroll">Payroll</Link>
                    | <a href="#" onClick={this.props.logout}>Log Out</a> |
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

export default connect(mapStateToProps, {logout})(Nav);
