import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export function configureStore(initialState: {}) {
    const composeEnhancers =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    );
}
