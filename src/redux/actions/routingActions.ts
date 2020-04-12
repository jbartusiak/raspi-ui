import { ROUTING_CHANGED, IRoutingAction } from './actionTypes';

function navigateTo(location: string): IRoutingAction {
    return {
        type: ROUTING_CHANGED,
        location,
    };
}
