import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {login} from "../actions";

class LoginPage extends Component {
    onFormSubmit({username, password}) {
        this.props.login(username, password);
    }

    render() {
        if (this.props.auth) {
            return <Redirect to="/"/>;
        } else {
            const {handleSubmit, pristine, submitting} = this.props;
            return (
                <div className="login-page">
                    <form className="ui form" onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
                        <div className="two fields">
                            <div className="field">
                                <Field name="username" component="input" type="text"/>
                            </div>
                            <div className="field">
                                <Field name="password" component="input" type="password"/>
                            </div>
                        </div>
                        <button className="ui button submit" type="submit" disabled={pristine || submitting}>Login</button>
                    </form>
                </div>
            );
        }
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

export default reduxForm({form: 'login'})(
    connect(mapStateToProps, {login})(LoginPage)
);
