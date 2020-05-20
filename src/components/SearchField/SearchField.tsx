import * as React from 'react';
import { TextField } from '@material-ui/core';

type Props = {};
export const SearchField = (props: Props) => {
    return (
        <TextField label={'Search'} variant={'outlined'} fullWidth style={{margin: '8px'}}/>
    );
};
