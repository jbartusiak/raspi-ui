import * as React from 'react';
import { Button } from '@material-ui/core';
import styles from './Actuator.module.scss';

export const Controls = () => {
    return (
        <div className={styles.ControlsContainer}>
            <Button variant="contained" color="primary">Start</Button>
            <Button variant="contained" color="primary">Restart</Button>
            <Button variant="contained" color="primary">Stop</Button>
        </div>
    );
};