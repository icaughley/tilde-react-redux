import React from "react";
import {observer} from "mobx-react";

export default observer(({field, type, placeholder = null, className}) => {
    type = type || field.type || 'text';
    if (type === 'checkbox') {
        return (
            <div className={"field " + className}>
                <input checked={field.value} {...field.bind({type: 'checkbox'})} />
                <div className={field.error ? "ui error message" : "hidden"}>
                    <p>{field.error}</p>
                </div>
            </div>
        );
    }

    if (type === 'dropdown') {

        return (
            <div className={"field " + className}>
                <select {...field}>
                    <option value=""/>
                    {field.extra.map(opt => {
                        const selected = opt.value === field.value;
                        return <option key={opt.value} value={opt.value} selected={selected}>{opt.text}</option>
                    })}
                </select>

                <div className={field.error ? "ui error message" : "hidden"}>
                    <p>{field.error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={"field " + className}>
            <input {...field.bind({type}) } />
            <div className={field.error ? "ui error message" : "hidden"}>
                <p>{field.error}</p>
            </div>
        </div>
    );
});
