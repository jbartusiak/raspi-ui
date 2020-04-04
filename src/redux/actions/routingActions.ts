import { ACTION_TYPE, IRoutingAction } from './actionTypes';

function navigateTo(location: string): IRoutingAction {
    return {
        type: ACTION_TYPE.ROUTING_CHANGE,
        location,
    };
}
