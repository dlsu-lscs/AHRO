import * as api from './api';
import {LOADING_TWEETS, TWEETS_AVAILABLE} from "./actionTypes";

// Get MapEvent - READ (R)
export function getTweets(errorCB) {
    return (dispatch) => {
        dispatch({type: LOADING_TWEETS});
        api.getTweets(function (success, data, error) {
            if (success) dispatch({type: TWEETS_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}