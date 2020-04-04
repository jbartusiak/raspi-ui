import { combineReducers, Reducer } from 'redux';
import { routingReducer } from './RoutingReducer';

const rootReducer: Reducer = combineReducers({
    routingReducer,
});

export default rootReducer;
