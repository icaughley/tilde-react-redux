import React from "react";
import {observer} from "mobx-react";
import {Button} from "semantic-ui-react";
import SimpleInput from "../inputs/SimpleInput";
import MobxReactForm from "mobx-react-form";
import validatorjs from "validatorjs";

export default observer(({form}) => {

    return (
        <form className={form.hasError ? 'error ui form' : 'ui form'} onSubmit={form.onSubmit}>
            <SimpleInput field={form.$('name')}/>
            <SimpleInput field={form.$('working')}/>
            <SimpleInput field={form.$('billable')}/>
            <Button type="submit" disabled={form.isPristine || form.submitting}>
                Submit
            </Button>
        </form>
    );
});

export function projectForm(onSubmit, initialValues) {
    const plugins = {dvr: validatorjs};

    const fields = [{
        name: 'name',
        label: 'Name',
        value: initialValues ? initialValues.name : "",
        rules: 'required|string'
    }, {
        type: 'checkbox',
        name: 'working',
        label: 'Working',
        value: initialValues ? initialValues.working : false,
        rules: 'boolean'
    }, {
        type: 'checkbox',
        name: 'billable',
        label: 'Billable',
        value: initialValues ? initialValues.billable : false,
        rules: 'boolean'
    }];

    const hooks = {
        onSuccess(form) {
            console.log(form.values());
            onSubmit({id: initialValues ? initialValues.id : null, ...form.values()});
        },
        onError(form) {
            alert('Form has errors!');
        }
    };

    return new MobxReactForm({fields}, {plugins, hooks});
}
