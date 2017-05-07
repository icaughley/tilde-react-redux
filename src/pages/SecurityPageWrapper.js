import React from "react";
import PropTypes from "prop-types";
import Nav from "../components/Nav";
import {connect} from "react-redux";
import {login, logout} from "../actions";

class AuthenticationPageWrapper extends React.Component {
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
        if (this.props.user) {
            return <Nav userName={this.props.user.name} logoutCallback={this.props.logout}/>;
        }
        else {
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
}

AuthenticationPageWrapper.propTypes = {
    user: PropTypes.object,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {login, logout})(AuthenticationPageWrapper);
