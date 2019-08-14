import React from "react";
import {Redirect} from "react-router-dom";
import {observer} from "mobx-react";
import authStore from "../stores/authStore";
import form from "../forms/loginForm";
import SimpleInput from "../inputs/SimpleInput";

export default observer(() => {
    if (authStore.authenticated) {
        return <Redirect to="/"/>;
    } else {
        return (
            <div className="login-page">
                <form className={form.hasError ? 'error ui form' : 'ui form'} onSubmit={form.onSubmit}>
                    <div className="two fields">
                        <SimpleInput field={form.$('username')}/>
                        <SimpleInput field={form.$('password')} type="password"/>
                    </div>
                    <button className="ui button submit" type="submit" disabled={form.isPristine || form.submitting}>
                        Login
                    </button>
                </form>
            </div>
        );
    }
});
