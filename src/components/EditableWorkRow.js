import React from "react";
import {Button} from "semantic-ui-react";
import MobxReactForm from "mobx-react-form";
import validatorjs from "validatorjs";
import TableInput from "../inputs/TableInput";

const required = value => (value ? undefined : 'Must not be blank');

const plugins = {dvr: validatorjs};

const EditableWorkRow = (props) => {

    const fields = [{
        name: 'projectId',
        type: 'dropdown',
        rules: 'required|string',
        value: String( props.initialValues.projectId ),
        extra: props.projectOptions
    }, {
        name: 'hours',
        value: props.initialValues.hours,
        rules: 'required|numeric|between:0,24'
    }, {
        name: 'comment',
        value: props.initialValues.comment,
        rules: 'string'
    }, {
        name: 'date',
        value: props.initialValues.date,
    }, {
        name: 'key',
        value: props.initialValues.key,
    }];

    const hooks = {
        onSuccess(form) {
            props.onSave(form.values());
        },
        onError(fields) {
            alert('Form has errors!');
        }
    };

    const form = new MobxReactForm({fields}, {plugins, hooks});

    return (
        <tr className={`ui form ${props.trClassName}`}>
            <td className={props.tdClassName}>
                {props.addCell}
            </td>
            <td className={props.tdClassName}>
                {props.dateCell}
            </td>
            <td className={props.tdClassName}>
                <TableInput field={form.$('projectId')}/>
            </td>
            <td className={props.tdClassName}>
                <TableInput field={form.$('hours')} className="hoursField"/>
            </td>
            <td className={props.tdClassName}>
                <TableInput field={form.$('comment')}/>
            </td>
            <td className={props.tdClassName}>
                <Button.Group>
                    <Button onClick={form.submit.bind(form)}
                            type="submit"
                            disabled={form.pristine || form.submitting}
                            className="ui compact icon">
                        <i className="checkmark icon"/>
                    </Button>
                    <Button onClick={props.onCancel.bind(null, props.initialValues)}
                            disabled={form.submitting}
                            className="ui compact icon">
                        <i className="red ban icon"/>
                    </Button>
                </Button.Group>
            </td>
        </tr>
    );
};


export default EditableWorkRow;

