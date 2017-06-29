import React from "react";

export function renderField(field) {
    const {meta: {touched, error}} = field;
    const className = `field ${touched && error ? "error" : ""}`;

    function renderCheckbox() {
        return (
            <div className={className}>
                <div className="ui checkbox">
                    <input type="checkbox" tabIndex="0" className="hidden" {...field.input}/>
                    <label>{field.label}</label>
                </div>
            </div>
        );
    }

    function renderOthers() {
        return (<div className={className}>
                <label>{field.label}</label>
                <input type={field.type} {...field.input} />
                <div className="ui error message">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    if (field.type === "checkbox")
        return renderCheckbox();
    else
        return renderOthers();
}