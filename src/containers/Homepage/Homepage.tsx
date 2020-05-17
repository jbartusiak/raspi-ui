import * as React from 'react';
import { useEffect } from 'react';
import { ActuatorGroup } from '../../components/ActuatorGroup/ActuatorGroup';
import ActuatorContainer from '../ActuatorContainer/ActuatorContainer';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState, ServiceStatus } from '../../redux/reducers/Types';
import { beginApiCall } from '../../redux/actions/apiCallActions';
import { getServiceConfiguration } from '../../redux/actions/actuatorActions';

export const Homepage = () => {
    const mainServiceName = 'Raspi Backend Service';
    const configurationFetched = useSelector((state: IApplicationState) => state.configuration.fetched);
    const dispatch = useDispatch();
    const services = useSelector((state: IApplicationState) => Object.values(state.services));

    useEffect(() => {
        const { actuator } = services[0];
        if (actuator.status === ServiceStatus.UP && !configurationFetched) {
            dispatch(beginApiCall());
            dispatch(getServiceConfiguration());
        }
    }, [services, configurationFetched, dispatch]);

    return (
        <>
            <ActuatorGroup name="Server">
                <ActuatorContainer selector={mainServiceName}/>
            </ActuatorGroup>
            {services.length > 1 && <ActuatorGroup name="Services">
                {Object.values(services).slice(1).map((el, index) =>
                    <ActuatorContainer key={index} selector={el.name}/>
                )}
            </ActuatorGroup>}
        </>
    );
};
