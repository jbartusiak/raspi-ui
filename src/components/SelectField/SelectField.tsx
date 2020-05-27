import * as React from 'react';
import { createStyles, FormControl, InputLabel, MenuItem, Select, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface ISelectFieldProps {
    selected: string;
    options: string[];
    label: string;
    fullWidth?: boolean;
    handleChange: (value: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            marginBottom: theme.spacing(2),
            minWidth: 250
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        }
    })
);

export const SelectField = (props: ISelectFieldProps) => {
    const classes = useStyles();

    const onChange = ({ target }: React.ChangeEvent<{ value: unknown }>) => {
        props.handleChange(target.value as string);
    };

    const menuOptions = (options: string[]) => {
        return options.map((el, index) =>
            <MenuItem
                selected={props.selected===el}
                key={index}
                value={el}>
                {el}
            </MenuItem>)
    }

    return (
        <FormControl variant="outlined" className={classes.formControl} fullWidth={props.fullWidth} >
            <InputLabel id="demo-simple-select-outlined-label">{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={onChange}
                label="Category"
                value={props.selected}
            >
                { menuOptions(props.options) }
            </Select>
        </FormControl>
    );
};
