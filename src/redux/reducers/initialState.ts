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
        categories: [],
        category: 'All',
        enabledProviders: [],
        query: '',
        results: [],
    },
    torrentClientApi: {
        torrents: null,
    },
};

const initialStateKey = 'RASPI_STATE';
const localStorageInitialState = localStorage.getItem(initialStateKey) || '{}';

const createInitialState = () => {
    const appState = JSON.parse(localStorageInitialState) as IApplicationState;
    return {
        ...initialState,
        services: {
            ...initialState.services,
            ...appState?.services,
        },
        torrentApi: {
            ...initialState.torrentApi,
            ...appState?.torrentApi,
        },
        torrentClientApi: {
            ...initialState.torrentClientApi,
            ...appState?.torrentClientApi,
        },
    };
};

export const subscribeListener = (reduxStore: any) => {
    const state = reduxStore.getState();
    localStorage.setItem('RASPI_STATE', JSON.stringify(state));
};

export default createInitialState();
