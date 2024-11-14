
import React from 'react';

function Input({ name, type, placeholder, label }) {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                id={name}
            />
        </div>
    );
}

export default Input;
