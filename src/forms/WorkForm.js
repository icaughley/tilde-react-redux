import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../helpers/formHelper";
import {Button} from "semantic-ui-react";

const required = value => (value ? undefined : 'Must not be blank');

const WorkForm = props => {
    return (
        <form onSubmit={props.handleSubmit} className="ui form">
            <Field name="name" label="Name" component={renderField} type="text" validate={[required]}/>
            <div className="fields">
                <Field name="working" label="Working" component={renderField} type="checkbox"/>
                <Field name="billable" label="Billable" component={renderField} type="checkbox"/>
            </div>
            <Button type="submit"
                    disabled={props.pristine || props.submitting}>Submit</Button>
        </form>
    );
};

export default reduxForm()(WorkForm);
