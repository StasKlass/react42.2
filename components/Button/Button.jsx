import React from 'react';
import './Button.css';  

function Button({ name, type }) {
    return (
        <button type={type}>
            {name}
        </button>
    );
}

export default Button;
