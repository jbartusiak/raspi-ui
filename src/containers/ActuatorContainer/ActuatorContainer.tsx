import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ControlActions, IApplicationState, ServiceStatus } from '../../redux/reducers/Types';
import { Actuator } from '../../components/Actuator/Actuator';
import * as actuatorActions from '../../redux/actions/actuatorActions';

type TActuatorProps = {
    selector: string;
}

const ActuatorContainer: React.FC<TActuatorProps> = ({ selector }: TActuatorProps) => {
    const selectedService = useSelector(({ services }: IApplicationState) => services[selector]);
    const isApiCallInProgress = useSelector(({ api }: IApplicationState) => api.apiCallsInProgress > 0);
    const isCommandIssued = useSelector(({ api }: IApplicationState)=> api.serviceCommand);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedService.actuator.status === ServiceStatus.UNKNOWN && !isCommandIssued) {
            console.log(`Fetching status of ${selector}.`);
            dispatch(actuatorActions.getServiceStatus(selectedService));
        }
    }, [selectedService, dispatch, selector, isCommandIssued]);

    const handleControlButtonClick = (command: ControlActions) => {
        console.log(`${selectedService.name}: ${command}`);
        dispatch(actuatorActions.runCommand(selectedService, command));
        return;
    };

    return (
        <Actuator
            onControlButtonClick={handleControlButtonClick}
            {...{ service: selectedService, isApiCallInProgress }}
        />
    );
};

export default ActuatorContainer;
