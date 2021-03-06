import React, { useRef } from 'react';
import { TextField } from '@material-ui/core';
import { inputStyles } from '../Common/InputStyles';
import classNames from 'classnames';

interface SearchFieldProps {
    name: string;
    label: string;
    handleChange: (value: string) => void;
}

export const SearchField = (props: SearchFieldProps) => {
    const classes = inputStyles();
    const ref = useRef<number>(-1);

    const onDelayComplete = (value: string) => props.handleChange(value);

    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value;
        window.clearTimeout(ref.current);
        ref.current = window.setTimeout(() => onDelayComplete(value), 1000);
    };

    return (
        <TextField
            className={classNames(classes.root, classes.growProportional)}
            name={props.name}
            label={props.label}
            variant={'outlined'}
            onChange={onChange}
        />);
};
