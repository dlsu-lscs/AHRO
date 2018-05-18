import * as t from './actionTypes';
import * as api from './api';

import { AsyncStorage } from 'react-native';

export function getRewards(callback, errorCB) {
    return (dispatch) => {
    	api.getRewards((rewards) => {
            console.log("NAH");
    		dispatch({type:t.GET_REWARDS, data: rewards});
    		callback();
    	}, errorCB);
    };
}

export function getQuizes(callback, errorCB) {
    return (dispatch) => {
    	api.getQuizes((quizes) => {
    		dispatch({type:t.GET_QUIZES, data: quizes});
    		callback();
    	}, errorCB);
    };
}