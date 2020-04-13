import React from 'react';
import Blinker from '../Blinker/Blinker';
import { Typography } from '@material-ui/core';
import styles from './Actuator.module.scss';
import { IService } from '../../redux/reducers/Types';
import { Controls } from './Controls';
import { SlideInDiv } from '../AnimationComponents/SlideInDiv';

interface IActuatorProps {
    service: IService;
    isApiCallInProgress: boolean;
}

export const Actuator: React.FC<IActuatorProps> = ({ service, isApiCallInProgress }) => {
    const serviceUrl = `http://${service.uri}:${service.port}`;
    const { status } = service.actuator;

    return (
        <SlideInDiv childrenClassName={styles.Actuator}>
            <Blinker status={status}/>
            <div>
                <Typography variant="h2">{service.name}</Typography>
                <small className={styles.ActuatorSubtitle}>
                    Service address - <a href={serviceUrl}>{serviceUrl}</a>
                </small>
            </div>
            <Controls {...{ isApiCallInProgress, status }}/>
        </SlideInDiv>
    );
};