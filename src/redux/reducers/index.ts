import { combineReducers } from 'redux';
import { actuatorReducer as services } from './ActuatorReducer';
import { routingReducer as location } from './RoutingReducer';
import { configurationReducer as configuration } from './ConfigurationReducer';

const rootReducer = combineReducers({
    configuration,
    location,
    services,
});

export default rootReducer;