import { combineReducers } from 'redux';
import { actuatorReducer as services } from './ActuatorReducer';
import { routingReducer as location } from './RoutingReducer';

const rootReducer = combineReducers({
    location,
    services,
});

export default rootReducer;