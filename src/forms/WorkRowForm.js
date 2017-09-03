import React from "react";
import PropTypes from "prop-types";
import {Button} from "semantic-ui-react";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../helpers/tableFormHelper"

const required = value => (value ? undefined : 'Must not be blank');

const WorkRowForm = (props) => {
    return (
        <tr className={`ui form ${props.trClassName}`} key={props.key}>
            <td className={props.tdClassName}>
                {props.addCell}
            </td>
            <td className={props.tdClassName}>
                {props.dateCell}
            </td>
            <td className={props.tdClassName}>
                <Field name="project" type="select" component={renderField} validate={[required]} props={{options: props.projectOptions}}/>
            </td>
            <td className={props.tdClassName}>
                <Field name="hours" type="text" component={renderField} validate={[required]} props={{className: "hoursField"}}/>
            </td>
            <td className={props.tdClassName}>
                <Field name="comment" type="text" component={renderField}/>
            </td>
            <td className={props.tdClassName}>
                <Button.Group>
                    <Button onClick={props.handleSubmit(props.onSave)}
                            type="submit"
                            disabled={props.pristine || props.submitting}
                            className="ui compact icon">
                        <i className="checkmark icon"/>
                    </Button>
                    <Button
                        disabled={props.submitting}
                        className="ui compact icon">
                        <i className="red ban icon"/>
                    </Button>
                </Button.Group>
            </td>
        </tr>
    );
};

WorkRowForm.propTypes = {
    workRow: PropTypes.object.isRequired,
    projectOptions: PropTypes.array.isRequired,
    trClassName: PropTypes.string.isRequired,
    tdClassName: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired
};

export default reduxForm({fields: ['project', 'hours', 'comment']})(WorkRowForm);

