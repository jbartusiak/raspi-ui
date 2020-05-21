import * as React from 'react';
import { createStyles, FormControl, InputLabel, MenuItem, Select, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface ISelectFieldProps {
    selected: string;
    options: string[];
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 250
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        }
    })
);

export const SelectField = (props: ISelectFieldProps) => {
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={age}
                onChange={handleChange}
                label="Category"
            >
                {
                    props.options.map((el, index) =>
                        <MenuItem
                            selected={props.selected===el}
                            key={index}
                            value={el}>
                            {el}
                        </MenuItem>)
                }
            </Select>
        </FormControl>
    );
};
