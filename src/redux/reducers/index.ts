import { combineReducers } from 'redux';
import { actuatorReducer as services } from './ActuatorReducer';
import { routingReducer as location } from './RoutingReducer';
import { configurationReducer as configuration } from './ConfigurationReducer';
import { apiCallsReducer as apiCallsInProgress } from './ApiCallsReducer';

const rootReducer = combineReducers({
    apiCallsInProgress,
    configuration,
    location,
    services,
});

export default rootReducer;