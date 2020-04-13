import * as React from 'react';
import { Button } from '@material-ui/core';
import styles from './Actuator.module.scss';
import { ServiceStatus } from '../../redux/reducers/Types';

export const Controls: React.FC<{status: ServiceStatus, isApiCallInProgress: boolean}> = ({ status, isApiCallInProgress }) => {
    return (
        <div className={styles.ControlsContainer}>
            <Button disabled={isApiCallInProgress || status===ServiceStatus.UP} variant="contained" color="secondary">Start</Button>
            <Button disabled={isApiCallInProgress || status===ServiceStatus.DOWN} variant="contained" color="secondary">Restart</Button>
            <Button disabled={isApiCallInProgress || status===ServiceStatus.DOWN} variant="contained" color="primary">Stop</Button>
        </div>
    );
};