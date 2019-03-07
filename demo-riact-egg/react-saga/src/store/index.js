import { createBrowserHistory } from 'history';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import App from '../components/App';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

// do not use this enhancer when in production environment
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    router: connectRouter(history),
    app: App.reducer
  }),
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

sagaMiddleware.run(App.saga);

export default store;
