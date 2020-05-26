import { combineReducers } from 'redux';
import { actuatorReducer as services } from './ActuatorReducer';
import { routingReducer as location } from './RoutingReducer';
import { configurationReducer as configuration } from './ConfigurationReducer';
import { apiReducer as api } from './ApiReducer';
import { torrentAPIReducer as torrentApi } from './TorrentApiReducer';
import { torrentClientApiReducer as torrentClientApi } from './TorrentClientApiReducer';

const rootReducer = combineReducers({
    api,
    configuration,
    location,
    services,
    torrentApi,
    torrentClientApi,
});

export default rootReducer;
