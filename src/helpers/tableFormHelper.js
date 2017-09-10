import React from "react";
import {Form, Dropdown} from "semantic-ui-react";

export function renderField(field) {
    const {meta: {touched, error}} = field;
    const className = `field ${touched && error ? "error" : ""} ${field.className ? field.className : ""}`;

    function renderCheckbox(props) {
        return (
            <div className={className}>
                <div className="ui checkbox">
                    <input type="checkbox" tabIndex="0" {...field.input}/>
                    <label>{field.label}</label>
                </div>
            </div>
        );
    }

    function renderSelect() {
        // The "options" prop on the field should be an array of objects: { value: "Key", text: "Value" }
        const blank = [{value: "", text: ""}];
        return (<Dropdown selection={true} fluid={true}
                      className={className}
                      {...field.input}
                      value={field.input.value}
                      onChange={(param,data) => field.input.onChange(data.value)}
                      options={blank.concat(field.options)}/>
        );
    }

    if (field.type === "select")
        return renderSelect();
    if (field.type === "checkbox")
        return renderCheckbox();
    else
        return <Form.Input className={className} label={field.label} type={field.type} {...field.input} />;
}
