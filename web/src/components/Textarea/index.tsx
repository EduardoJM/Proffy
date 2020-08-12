import React, { useEffect, useRef, TextareaHTMLAttributes } from 'react';
import { useField } from '@unform/core';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
}

const Textarea: React.FC<TextareaProps> = ({ name, label, ...rest }) => {
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
            <div className="textarea-block">
                <label htmlFor={name}>{label}</label>
                <textarea
                    ref={inputRef}
                    id={name}
                    defaultValue={defaultValue}
                    {...rest}
                />
            </div>
            {error && (
                <span className="error">{error}</span>
            )}
        </>
    );
}

export default Textarea;
