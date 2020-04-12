import React from 'react';
import Blinker from '../Blinker/Blinker';
import { LinearProgress, Typography } from '@material-ui/core';
import styles from './Actuator.module.scss';
import { IService, ServiceStatus } from '../../redux/reducers/Types';
import { Controls } from './Controls';

export const Actuator: React.FC<IService> = ({ actuator, name, uri, port }) => {
    const serviceUrl = `http://${uri}:${port}`;

    return (
        <>
            <div className={styles.Actuator}>
                <Blinker status={actuator.status}/>
                <div>
                    <Typography variant="h2">{name}</Typography>
                    <small className={styles.ActuatorSubtitle}>
                        Service address - <a href={serviceUrl}>{serviceUrl}</a>
                    </small>
                </div>
                <Controls/>
            </div>
            {actuator.status === ServiceStatus.UNKNOWN && <LinearProgress/>}
        </>
    );
};