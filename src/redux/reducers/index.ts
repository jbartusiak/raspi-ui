import { combineReducers } from 'redux';
import { actuatorReducer as services } from './ActuatorReducer';
import { routingReducer as location } from './RoutingReducer';
import { configurationReducer as configuration } from './ConfigurationReducer';
import { apiReducer as api } from './ApiReducer';
import { torrentAPIReducer as torrentApi } from './TorrentApiReducer';

const rootReducer = combineReducers({
    api,
    configuration,
    location,
    services,
    torrentApi,
});

export default rootReducer;
