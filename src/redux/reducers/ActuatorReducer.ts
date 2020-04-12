import { AnyAction } from 'redux';
import initialState from './initialState';
import { ACTUATE, IActuateAction } from '../actions/actionTypes';

export const actuatorReducer = (
    state = initialState.services,
    action: AnyAction
) => {
    if(action.type===ACTUATE) {
        const { service, status } = action as IActuateAction;

        return {
            ...state,
            [service.name]: {
                ...service,
                actuator: {
                    ...service.actuator,
                    status: status
                }
            }
        }
    }
    return state;
};
