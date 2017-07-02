import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../helpers/formHelper";
import {Form, Button} from "semantic-ui-react";

const required = value => (value ? undefined : 'Must not be blank');

const ProjectForm = props => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Field name="name" label="Name" component={renderField} type="text" validate={[required]}/>
            <Field name="working" label="Working" component={renderField} type="checkbox"/>
            <Field name="billable" label="Billable" component={renderField} type="checkbox"/>
            <Button type="submit"
                    disabled={props.pristine || props.submitting}>Submit</Button>
        </Form>
    );
};

export default reduxForm({form: 'ProjectForm'})(ProjectForm);
