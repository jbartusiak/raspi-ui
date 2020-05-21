import * as React from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@material-ui/core';
import styles from './CheckboxGroup.module.scss';
import { useEffect, useState } from 'react';

interface CheckboxGroupProps {
    options: string[];
    checked: string[];
    handleChange: (selected: IOptions) => void;
}

export interface IOptions {
    [name: string]: boolean
}

export const CheckboxGroup = ({ checked, handleChange, options }: CheckboxGroupProps) => {
    const [state, setState] = useState<IOptions>({});

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newState = {...state, [event.target.name]: event.target.checked };
        setState(newState);
        handleChange(newState);
    };

    useEffect(()=> {
        const result: {[name: string]: boolean} = {};
        options.forEach(el=> result[el]=false);
        checked.forEach(el=> result[el]=true);
        setState(result);
    }, [options, checked])

    const areAllOptionsChecked = () => {
        return Object.values(state).every(el=>el);
    }

    const onAllOptionsChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;

        const newState: {[name: string]: boolean} = {};
        options.forEach(el=>newState[el]=isChecked);
        setState(newState);
        handleChange(newState);
    }

    return (
        <FormControl component="fieldset" className={styles.CheckboxGroup}>
            <FormLabel component="legend" className={styles.HeaderLabel}>
                Select torrent providers from the list below. Note that default,
                tested providers are already selected.
            </FormLabel>
            <FormGroup>
                <FormControlLabel
                    key={'all-check'}
                    control={
                        <Checkbox
                            name="gilad"
                            checked={areAllOptionsChecked()}
                        onChange={onAllOptionsChecked}/>
                    }
                    label="Select all"
                />
                {
                    Object.entries(state).map(([name, value], curr)=> {
                        return (
                            <FormControlLabel
                                key={`${curr}`}
                                control={
                                    <Checkbox
                                        name={name}
                                        checked={value}
                                        onChange={onChange}/>
                                }
                                label={name}
                            />
                        );
                    })
                }
            </FormGroup>
        </FormControl>
    );
};
