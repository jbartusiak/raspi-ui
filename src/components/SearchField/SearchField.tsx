import * as React from 'react';
import { TextField } from '@material-ui/core';

interface SearchFieldProps {
    name: string;
    label: string;
    handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchField = (props: SearchFieldProps) => (
    <TextField
        name={props.name}
        label={props.label}
        variant={'outlined'}
        onChange={props.handleChange}
        style={{ margin: '8px' }}
        fullWidth
    />
);
