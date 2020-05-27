import { Torrent } from 'torrent-search-api';

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
    configuration?: { [name: string]: any };
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
    torrentClientApi: ITorrentClientAPI;
}

export interface ITorrentClientAPITorrentItem {
    downloadDir: string;
    eta: number;
    id: number;
    name: string;
    peersConnected: number;
    peersSendingToUs: number;
    rateDownload: number;
    rateUpload: number;
    status: number;
    totalSize: number;
}

export interface ITorrentClientAPI {
    torrents: ITorrentClientAPITorrentItem[] | null;
}

export interface ITorrentProvider {
    name: string;
    public: string;
    categories: string[];
}

export interface ITorrentAPI {
    allProviders: ITorrentProvider[];
    categories: string[];
    category: string;
    enabledProviders: string[];
    query: string;
    results: Torrent[];
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
