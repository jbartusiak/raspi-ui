export enum ServiceStatus {
    UP,
    DOWN,
    UNKNOWN,
}

export enum ControlActions {
    START,
    STOP,
    RESTART,
}

export interface ICommand {
    command: string;
}

export interface IFeatureRoute {
    name: string;
    route: string;
}

export interface IActuator {
    status: ServiceStatus;
    health: string | ICommand;
    parseStatus: RegExp | string;
}

export interface IService {
    name: string;
    uri: string;
    port: string;
    icon?: string;

    actuator: IActuator;

    start: string;
    stop: string;
    restart: string;
    dependsOn?: string;
    featureRoute?: IFeatureRoute;
}

export interface IApplicationState {
    api: {
        apiCallsInProgress: number;
        serviceCommand: boolean;
    };
    configuration: {
        fetched: boolean;
    };
    location: string;
    services: {
        [name: string]: IService;
    };
}

export interface ISite {
    name: string;
    url: string;
    icon: string;
}
