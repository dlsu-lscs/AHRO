import * as t from './actionTypes';
import * as api from './api';

import { AsyncStorage } from 'react-native';

export function getRewards(callback, errorCB) {
    return (dispatch) => {
    	api.getRewards((rewards) => {
    		dispatch({type:t.GET_REWARDS, data: rewards});
    		callback();
    	}, errorCB);
    };
}

export function getQuizes(callback, errorCB) {
    return (dispatch) => {
    	api.getQuizes((newkey, quizes) => {
    		dispatch({type:t.GET_QUIZES, data: quizes, key: newkey});
    		callback();
    	}, errorCB);
    };
}

export function getInvitations(callback, errorCB) {
    return (dispatch) => {
        api.getInvitations((newkey, newinvite) => {
            dispatch({type:t.GET_NOTIFS, data: newinvite, key: newkey});
            callback();
        }, errorCB);
    };
}

export function updatePoints(user, reward){
    return (dispatch) => {
        api.updatePoints(user, reward, () => {});
    }
}