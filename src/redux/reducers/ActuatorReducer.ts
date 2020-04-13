import { AnyAction } from 'redux';
import initialState from './initialState';
import { GET_SERVICE_STATUS_SUCCESSS, IActuateAction, IUpdateServicesAction, GET_SERVICE_CONFIGURATION_SUCCESS } from '../actions/actionTypes';

export const actuatorReducer = (
    state = initialState.services,
    action: AnyAction
) => {
    if(action.type===GET_SERVICE_STATUS_SUCCESSS) {
        const { service, status } = action as IActuateAction;

        return {
            ...state,
            [service.name]: {
                ...service,
                actuator: {
                    ...service.actuator,
                    status
                }
            }
        }
    }
    else if (action.type === GET_SERVICE_CONFIGURATION_SUCCESS){
        const { services } = action as IUpdateServicesAction;

        return {
            ...state,
            ...services.services
        }
    }
    return state;
};
