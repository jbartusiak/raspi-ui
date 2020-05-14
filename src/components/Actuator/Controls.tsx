import * as React from 'react';
import { Button } from '@material-ui/core';
import styles from './Actuator.module.scss';
import { ControlActions, ServiceStatus } from '../../redux/reducers/Types';

interface IControlsProps {
    status: ServiceStatus;
    isApiCallInProgress: boolean;
    onControlButtonClick: (command: ControlActions) => void;
}

export const Controls: React.FC<IControlsProps> = ({ status, isApiCallInProgress , onControlButtonClick}) => {
    const handleClick = (action: ControlActions) => (event: React.MouseEvent) => {
        onControlButtonClick(action);
    }

    return (
        <div className={styles.ControlsContainer}>
            <Button
                disabled={isApiCallInProgress || status === ServiceStatus.UP}
                variant="contained"
                color="secondary"
                onClick={handleClick(ControlActions.START)}
            >
                Start
            </Button>
            <Button
                disabled={isApiCallInProgress || status === ServiceStatus.DOWN}
                variant="contained"
                color="secondary"
                onClick={handleClick(ControlActions.RESTART)}
                >
                Restart
            </Button>
            <Button
                disabled={isApiCallInProgress || status === ServiceStatus.DOWN}
                variant="contained"
                color="primary"
                onClick={handleClick(ControlActions.STOP)}
            >
                Stop
            </Button>
        </div>
    );
};
