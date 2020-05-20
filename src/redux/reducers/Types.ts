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
    torrentApi: ITorrentAPI;
}

export interface ITorrentProvider {
    name: string;
    public: string;
    categories: string[];
}

export interface ITorrentResult {
    name: string;
    public: string;
    categories: string[];
}

export interface ITorrentAPI {
    allProviders: ITorrentProvider[];
    enabledProviders: string[];
    category: string;
    query: string;
    results: ITorrentResult[];
}

export interface EnableProvidersRequest {
    [name: string]: boolean;
}

export interface IEndpointSpec {
    host: string;
    port: string;
    uri: string;
}

export interface ISite {
    name: string;
    url: string;
    icon: string;
}
