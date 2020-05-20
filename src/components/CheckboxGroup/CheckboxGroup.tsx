import * as React from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@material-ui/core';
import styles from './CheckboxGroup.module.scss';

interface CheckboxGroupProps {

}

export const CheckboxGroup = (props: CheckboxGroupProps) => {
    return (
        <FormControl component="fieldset" className={styles.CheckboxGroup}>
            <FormLabel component="legend">
                Select torrent providers from the list below. Note that default,
                tested providers are already selected.
            </FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox name="gilad" />}
                    label="Select all"
                />
                <FormControlLabel
                    control={<Checkbox name="gilad" />}
                    label="Provider 1"
                />
                <FormControlLabel
                    control={<Checkbox name="jason" />}
                    label="Provider 2"
                />
                <FormControlLabel
                    control={<Checkbox name="antoine" />}
                    label="Provider 3"
                />
            </FormGroup>
        </FormControl>
    );
};
