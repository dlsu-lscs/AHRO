import * as api from './api';
import {EVENTS_AVAILABLE, LOADING_EVENTS} from "./actionTypes";

// Get MapEvent - READ (R)
export function getEvents(errorCB) {
    return (dispatch) => {
        dispatch({type: LOADING_EVENTS});
        api.getEvents(function (success, data, error) {
            if (success) dispatch({type: EVENTS_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}