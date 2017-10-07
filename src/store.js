import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger';
import reducers from './reducers';

const middleware = applyMiddleware(createLogger());
export default createStore(reducers,middleware);