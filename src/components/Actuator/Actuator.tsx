import React from 'react';
import Blinker from '../Blinker/Blinker';
import { LinearProgress, Typography } from '@material-ui/core';
import styles from './Actuator.module.scss';
import { IService } from '../../redux/reducers/Types';
import { Controls } from './Controls';

export const Actuator: React.FC<IService> = ({ actuator, name }) => {
    return (
        <>
            <div className={styles.Actuator}>
                <Blinker status={actuator.status}/>
                <Typography variant="h2">{name}</Typography>
                <Controls/>
            </div>
            <LinearProgress/>
        </>
    );
};