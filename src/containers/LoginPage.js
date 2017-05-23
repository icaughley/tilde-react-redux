import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {login} from "../actions";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        // this.state = {username: "", password: ""};
        this.state = {username: "icaughley", password: "ian"};

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    onUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }

    render() {
        if (this.props.auth)
            return <Redirect to="/"/>;
        else
            return (
                <div className="login-page">
                    <form onSubmit={this.onFormSubmit}>
                        <input value={this.state.username} onChange={this.onUsernameChange}/>
                        <input type='password' value={this.state.password} onChange={this.onPasswordChange}/>
                        <button type="submit">Login</button>
                    </form>
                </div>
            );
    }
}

LoginPage.propTypes = {
    auth: PropTypes.object,
    login: PropTypes.func.isRequired
};

function mapStateToProps({auth}) {
    return {
        auth
    }
}

export default connect(mapStateToProps, {login})(LoginPage);
