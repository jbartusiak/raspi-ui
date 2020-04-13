import React from 'react';
import Blinker from '../Blinker/Blinker';
import { Typography } from '@material-ui/core';
import styles from './Actuator.module.scss';
import { IService } from '../../redux/reducers/Types';
import { Controls } from './Controls';
import { SlideInDiv } from '../AnimationComponents/SlideInDiv';

export const Actuator: React.FC<IService> = ({ actuator, name, uri, port }) => {
    const serviceUrl = `http://${uri}:${port}`;

    return (
        <SlideInDiv childrenClassName={styles.Actuator}>
            <Blinker status={actuator.status}/>
            <div>
                <Typography variant="h2">{name}</Typography>
                <small className={styles.ActuatorSubtitle}>
                    Service address - <a href={serviceUrl}>{serviceUrl}</a>
                </small>
            </div>
            <Controls/>
        </SlideInDiv>
    );
};