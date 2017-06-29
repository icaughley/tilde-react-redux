import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../helpers/formHelper";

const ProjectForm = props => {
    return (
        <form onSubmit={props.handleSubmit} className="ui form">
            <Field name="name" label="Name" component={renderField} type="text"/>
            <Field name="working" label="Working" component={renderField} type="checkbox"/>
            <Field name="billable" label="Billable" component={renderField} type="checkbox"/>
            <button className="ui submit button" type="submit">Submit</button>
        </form>
    );
};

export default reduxForm({form: 'ProjectForm'})(ProjectForm);
