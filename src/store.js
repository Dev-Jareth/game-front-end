import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger';
import promise from 'redux-promise-middleware';
import reducers from './reducers';

const middleware = applyMiddleware(createLogger(),promise());
export default createStore(reducers,middleware);