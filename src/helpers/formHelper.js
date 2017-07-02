import React from "react";
import {Form} from "semantic-ui-react";

export function renderField(field) {
    const {meta: {touched, error}} = field;
    const className = `field ${touched && error ? "error" : ""}`;

    function renderCheckbox() {
        return (
            <div className={className}>
                <div className="ui checkbox">
                    <input type="checkbox" tabIndex="0" {...field.input}/>
                    <label>{field.label}</label>
                </div>
            </div>
        );
    }

    if (field.type === "checkbox")
        return renderCheckbox();
    else
        return <Form.Input className={className} label={field.label} type={field.type} {...field.input} />;
}
