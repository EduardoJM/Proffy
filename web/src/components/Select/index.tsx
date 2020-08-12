import React, { useRef, useEffect } from 'react';
import ReactSelect, {
    OptionTypeBase,
    Props as ReactSelectProps,
} from 'react-select';
import { useField } from '@unform/core';

import './styles.css';

interface SelectProps extends ReactSelectProps<OptionTypeBase> {
    label: string;
    name: string;
    noFloatError?: boolean;
}

interface StyleState {
    hasValue: boolean;
    isDisabled: boolean;
    isFocused: boolean;
    isMulti: boolean;
    menuIsOpen: boolean;
}

const Select: React.FC<SelectProps> = ({ name, label, noFloatError, ...rest }) => {
    const selectRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            getValue: (ref: any) => {
                if (rest.isMulti) {
                    if (!ref.state.value) {
                        return [];
                    }
                    return ref.state.value.map((option: OptionTypeBase) => option.value);
                }
                if (!ref.state.value) {
                    return '';
                }
                return ref.state.value.value;
            },
        });
    }, [fieldName, registerField, rest.isMulti]);

    return (
        <>
            <div className="select-block">
                <label htmlFor={name}>{label}</label>
                <ReactSelect
                    id={name}
                    defaultValue={defaultValue}
                    ref={selectRef}
                    className="react-select"
                    classNamePrefix="react-select"
                    styles={{
                        control: (provided, state: StyleState) => {
                            let borderRadius = {};
                            if (state.menuIsOpen) {
                                borderRadius = {
                                    borderBottomLeftRadius: '0 !important',
                                    borderBottomRightRadius: '0 !important'
                                };
                            }
                            return {
                                ...provided,
                                height: '100%',
                                border: 'none',
                                outline: 'none',
                                boxShadow: 'none',
                                ...borderRadius
                            }
                        },
                        menu: (provided) => ({
                            ...provided,
                            minWidth: '200px',
                            marginTop: 0
                        }),
                    }}
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

export default Select;
