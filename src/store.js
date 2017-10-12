import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import promise from 'redux-promise-middleware';
import reducers from './reducers';

export default history=>createStore(reducers,applyMiddleware(createLogger(),routerMiddleware(history),promise()));