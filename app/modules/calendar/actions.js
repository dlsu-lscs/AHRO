import * as t from './actionTypes';
import * as api from './api';
import { auth } from "../../config/firebase";

import { AsyncStorage } from 'react-native';

export function getEvents(errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_EVENTS});
        api.getEvents(function (success, data, error) {
            if (success) dispatch({type: t.EVENTS_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}