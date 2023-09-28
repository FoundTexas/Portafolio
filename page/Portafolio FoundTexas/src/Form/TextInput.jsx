import React from 'react';

function TextInput({ name, value, onChange, label, type, unit, isNeeded = false, isVisible = true}) {
    if (!isVisible) {
        return null;
    }

    return (
        <div>
            <h2 htmlFor={name}>{label}: </h2>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={isNeeded}
            />
            <label htmlFor={name}> {unit} </label>
        </div>
    );
}

export default TextInput;
