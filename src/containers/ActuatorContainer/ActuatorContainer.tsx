import React, { useEffect } from 'react';
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
        if(selectedService.actuator.status === ServiceStatus.UNKNOWN) {
            console.log(`Fetching status of ${selector}.`)
            dispatch(actuatorActions.getServiceStatus(selectedService));
        }
    }, [selectedService, dispatch, selector]);

    return <Actuator {...selectedService} />;
};

export default ActuatorContainer;
