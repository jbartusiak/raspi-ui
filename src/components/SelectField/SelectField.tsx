import React from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import { inputStyles } from '../Common/InputStyles';
import classNames from 'classnames';

interface ISelectFieldProps {
    selected: string;
    options: string[];
    label: string;
    fullWidth?: boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SelectField = (props: ISelectFieldProps) => {
    const classes = inputStyles();

    const menuOptions = (options: string[]) => {
        return options.map((el, index) =>
            <MenuItem
                selected={props.selected === el}
                key={index}
                value={el}>
                {el}
            </MenuItem>);
    };

    return (
        <TextField
            select
            className={classNames(classes.root, classes.grow, classes.minWidth)}
            name={props.label}
            id="demo-simple-select-outlined"
            onChange={props.handleChange}
            label={props.label}
            value={props.selected}
            variant="outlined"
        >
            {menuOptions(props.options)}
        </TextField>
    );
};
