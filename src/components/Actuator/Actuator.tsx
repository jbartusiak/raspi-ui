import React from 'react';
import Blinker from '../Blinker/Blinker';
import { Typography } from '@material-ui/core';
import styles from './Actuator.module.scss';
import { ControlActions, IService } from '../../redux/reducers/Types';
import { SlideInDiv } from '../AnimationComponents/SlideInDiv';
import { Controls } from './Controls';

interface IActuatorProps {
    service: IService;
    isApiCallInProgress: boolean;
    onControlButtonClick: (command: ControlActions) => void;
}

export const Actuator: React.FC<IActuatorProps> = ({ service, isApiCallInProgress, onControlButtonClick }) => {
    const serviceUrl = `http://${service.uri}:${service.port}`;
    const { status } = service.actuator;

    return (
        <SlideInDiv childrenClassName={styles.Actuator}>
            <Blinker status={status}/>
            <div>
                {service.icon && <img src={service.icon}/>}
            </div>

            <div>
                <Typography variant="h2">{service.name}</Typography>
                <small className={styles.ActuatorSubtitle}>
                    Service address - <a href={serviceUrl}>{serviceUrl}</a>
                </small>
            </div>

            {/*<Controls {...{ isApiCallInProgress, status, onControlButtonClick}}/>*/}
        </SlideInDiv>
    );
};
