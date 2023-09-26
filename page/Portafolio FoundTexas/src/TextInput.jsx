import React from 'react';

function TextInput({ name, value, onChange, label, type, unit }) {

    return (
        <div>
            <label htmlFor={name}>{label}: </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required
            />
            <label htmlFor={name}> {unit} </label>
        </div>
    );
}

export default TextInput;
