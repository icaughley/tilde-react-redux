import React from "react";
import {observer} from "mobx-react";

export default observer(({field, type, placeholder = null}) => {
    type = type || field.type || 'text';
    if (type === 'checkbox') {
        return (
            <div className="field">
                <label htmlFor={field.id}>{field.label}</label>
                <input checked={field.value} {...field.bind({ type: 'checkbox',})} />
                <div className={field.error ? "ui error message" : "hidden"}>
                    <p>{field.error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="field">
            <label htmlFor={field.id}>{field.label}</label>
            <input {...field.bind({type, placeholder}) } />
            <div className={field.error ? "ui error message" : "hidden"}>
                <p>{field.error}</p>
            </div>
        </div>
    );
});
