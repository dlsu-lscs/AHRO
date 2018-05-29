import * as t from './actionTypes';
import * as api from './api';

import { auth } from "../../config/firebase";

import { AsyncStorage } from 'react-native';

export function createTeam(data, successCB, errorCB) {
    return (dispatch) => {
        api.createTeam(data, function (success, data, error) {
            if (success) successCB(data);
            else if (error) errorCB(error)
        });
    };
}

export function getTeam(successCB, errorCB) {
    return (dispatch) => {
        api.getTeam(function (success, data, error) {
            if (success) successCB(data);
            else if (error) errorCB(error)
        });
    };
}

export function sendInvite(data, successCB, errorCB) {
    console.log("@sendInvite actions");
    return (dispatch) => {
        api.sendInvite(data, function (success, data, error) {
            if (success) successCB(data);
            else if (error) errorCB(error)
        });
    };
}

export function getInvites(successCB, errorCB) {
    console.log("@getInvites actions");
    return (dispatch) => {
        api.getInvites(function (success, data, error) {
            if (success) successCB(data);
            else if (error) errorCB(error)
        });
    };
}

export function acceptInvite(data, successCB, errorCB) {
    console.log("@acceptInvite actions");
    return (dispatch) => {
        api.acceptInvite(data, function (success, data, error) {
            if (success) successCB(data);
            else if (error) errorCB(error)
        });
    };
}