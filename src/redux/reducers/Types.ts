export enum ServiceStatus {
    UP,
    DOWN,
    UNKNOWN,
}

export interface IActuator {
    status: ServiceStatus;
    health: string;
    parseStatus: RegExp | string;
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
    apiCallsInProgress: number;
    configuration: {
        fetched: boolean;
    };
    location: string;
    services: {
        [name: string]: IService
    }
}
