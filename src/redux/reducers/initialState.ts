import { IApplicationState, ServiceStatus } from './Types';

const initialState:IApplicationState = {
    location: '/',
    services: {
        'Raspi Backend Service': {
            name: 'Raspi Backend Service',
            uri: '192.168.0.254',
            port: '8888',
            actuator: {
                status: ServiceStatus.UNKNOWN,
                health: '/actuator/health',
                parseStatus: /(status).*(UP)/
            },
            start: '',
            stop: '',
            restart: ''
        }
    }
};

export default initialState;