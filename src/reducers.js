import {combineReducers} from 'redux';

import {routerReducer} from 'react-router-redux';

import {Type} from './actions';
const pending = type=>type+'_PENDING';
const fulfilled = type=>type+'_FULFILLED';
const rejected = type=>type+'_REJECTED';

let userInitState = {
    user: null,
    badCredentials: false,
    goodCredentials: false
};
const userReducer = (state = userInitState, action) => {
    switch (action.type) {
        case pending(Type.User.login):
            {
                //Login Begins
                state = {
                    ...state,
                    badCredentials: false,
                    goodCredentials: false,
                }
                break;
            }
        case fulfilled(Type.User.login):
            {
                if (action.payload.user) 
                    //Login Success
                    state = {
                        ...state,
                        user: action.payload.user,
                        goodCredentials: true
                    };
                else 
                    //Login Failed
                    state = {
                        ...state,
                        user: null,
                        badCredentials: true
                    }
                break;
            }
        case Type.User.logout:
            {
                state = {
                    ...userInitState
                };
                break;
            }
        default:
            break;
    }
    return state;
};

export default combineReducers({user: userReducer, router: routerReducer})