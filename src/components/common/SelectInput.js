import React from "react";
import PropTypes from "prop-types";

const SelectInput = ({name, label, onChange, defaultOption, value, error, options}) => {
    return (
        <div className="ui vertical menu">
            <label htmlFor={name}>{label}</label>
            <div>
                {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="ui selection dropdown">
                    <option value="-1">{defaultOption}</option>
                    {options.map((option) => {
                        return <option key={option.value} value={option.value}>{option.text}</option>;
                    })
                    }
                </select>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;
