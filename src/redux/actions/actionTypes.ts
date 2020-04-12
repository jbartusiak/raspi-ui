import { AnyAction } from 'redux';
import { IService, ServiceStatus } from '../reducers/Types';

export const ROUTING_CHANGED = 'ROUTING_CHANGED';
export const ACTUATE = 'ACTUATE';

export interface IRoutingAction extends AnyAction {
    location: string;
}
export interface IActuateAction extends AnyAction {
    service: IService;
    status: ServiceStatus;
}
