import React, { useEffect, useRef, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <>
            <div className="input-block">
                <label htmlFor={name}>{label}</label>
                <input
                    ref={inputRef}
                    defaultValue={defaultValue}
                    type="text"
                    id={name}
                    {...rest}
                />
            </div>
            {error && (
                <span className="error">{error}</span>
            )}
        </>
    );
}

export default Input;
