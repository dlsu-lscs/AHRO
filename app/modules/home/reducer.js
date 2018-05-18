import * as t from './actionTypes';
import { NET_INFO_CHANGED } from 'react-native-redux-listener';

let initialState = { isConnected: false, data: [], rewards:[], quizes: [] };

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case NET_INFO_CHANGED:
            state = Object.assign({}, state, {isConnected: action.isConnected});
            return state;

        case t.FIRST_ACTION:
            state = Object.assign({}, state, {data: action.data });
            return state;

        case t.GET_REWARDS:
            return {...state, rewards: action.data};

        case t.GET_QUIZES:
            return {...state, quizes: action.data};
        default:
            return state;
    }
};


export default authReducer;