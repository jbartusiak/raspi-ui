export enum ServiceStatus {
    UP,
    DOWN,
    UNKNOWN,
}

export interface IActuator {
    status: ServiceStatus;
    health: string;
    parseStatus: RegExp;
}

export interface IService {
    name: string;
    uri: string;
    port: string;

    actuator: IActuator;

    start: string;
    stop: string;
    restart: string;
    dependsOn?: string;
}

export interface IApplicationState {
    location: string;
    services: {
        [name: string]: IService
    }
}
