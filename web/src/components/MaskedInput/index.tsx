import React, { useRef, useEffect } from 'react';
import ReactInputMask, { Props as ReactMaskedInputProps } from 'react-input-mask';
import { useField } from '@unform/core';

import './styles.css';

interface MaskedInputProps extends ReactMaskedInputProps {
    name: string;
    label: string;
    noFloatError?: boolean;
}

const MaskedInput: React.FC<MaskedInputProps> = ({ name, label, noFloatError, ...rest }) => {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
            setValue(ref: any, value: string) {
                ref.setInputValue(value);
            },
            clearValue(ref: any) {
                ref.setInputValue('');
            },
        });
    }, [fieldName, registerField]);

    return (
        <>
            <div className="masked-input-block">
                <label htmlFor={name}>{label}</label>
                <ReactInputMask
                    id={name}
                    ref={inputRef}
                    defaultValue={defaultValue}
                    {...rest}
                />
                {error && !noFloatError && (
                    <span className="error">{error}</span>
                )}
            </div>
            {error && noFloatError && (
                <span className="error">{error}</span>
            )}
        </>
    );
}

export default MaskedInput;
