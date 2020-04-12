import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export function configureStore(initialState:any) {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
