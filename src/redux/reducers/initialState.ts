import { IApplicationState, ServiceStatus } from './Types';

const initialState: IApplicationState = {
    api: {
        apiCallsInProgress: 0,
        serviceCommand: false,
    },
    configuration: {
        fetched: false,
    },
    location: '/',
    services: {
        'Raspi Backend Service': {
            name: 'Raspi Backend Service',
            uri: '192.168.0.254',
            port: '8888',
            actuator: {
                status: ServiceStatus.UNKNOWN,
                health: '/actuator/health',
                parseStatus: /(status).*(UP)/,
            },
            start: '',
            stop: '',
            restart: '',
        },
    },
    torrentApi: {
        allProviders: [],
        enabledProviders: [],
        category: 'All',
        query: '',
        results: [],
    },
};

export default initialState;
