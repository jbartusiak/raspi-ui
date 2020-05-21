import * as React from 'react';
import { TextField } from '@material-ui/core';
import { useRef } from 'react';

interface SearchFieldProps {
    name: string;
    label: string;
    handleChange: (value: string) => void;
}

export const SearchField = (props: SearchFieldProps) => {
    const ref = useRef<number>();

    const onDelayComplete = (value: string) => props.handleChange(value);

    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value;
        window.clearTimeout(ref.current);
        console.log('Cleared timeout');
        ref.current = window.setTimeout(() => onDelayComplete(value), 1000);
    };

    return (<TextField
        name={props.name}
        label={props.label}
        variant={'outlined'}
        onChange={onChange}
        style={{ margin: '8px' }}
        fullWidth
    />);
};
