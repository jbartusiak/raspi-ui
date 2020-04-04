import { AnyAction } from 'redux';

export enum ACTION_TYPE {
    ROUTING_CHANGE,
}

export interface IRoutingAction extends AnyAction {
    location: string;
}
