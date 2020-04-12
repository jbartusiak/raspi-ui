import React, { MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState, ServiceStatus } from '../../redux/reducers/Types';
import { Actuator } from '../../components/Actuator/Actuator';
import * as actuatorActions from '../../redux/actions/actuatorActions';

type TActuatorProps = {
    selector: string;
}

const ActuatorContainer: React.FC<TActuatorProps> = ({selector}: TActuatorProps) => {
    const selectedService = useSelector(({ services }: IApplicationState)=>services[selector]);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(selectedService.actuator.status===ServiceStatus.UNKNOWN) {
            console.log('actuating...');
            dispatch(actuatorActions.actuate(selectedService));
        }
    }, [selectedService, dispatch]);

    const handleClick = (event: MouseEvent) => {
        console.log(event);
    }

    return <div onClick={handleClick}><Actuator {...selectedService} /></div>;
};

export default ActuatorContainer;
