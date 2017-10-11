import {combineReducers} from 'redux';
import {Type} from './actions';
const userReducer = (state={user:null,badCredentials:false},action)=>{
    switch(action.type){
        case Type.User.login:{
            console.log('Checking Details');
            break;
        }
        case Type.User.login+'_FULFILLED':{
            if(action.payload.user)
            state = {...state, user: action.payload.user, badCredentials:false};
            else
            state = {...state, user:null, badCredentials:true}
            break;
        }
        case Type.User.logout:{
            state = {...state, user:null};
            break;
        }
        default: break;
    }
    return state;
};

export default combineReducers({
    user:userReducer
})