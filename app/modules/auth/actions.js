import * as t from './actionTypes';
import * as api from './api';
import { auth, database } from "../../config/firebase";

import { AsyncStorage } from 'react-native';

import * as t2 from "../home/actionTypes";


import {Notifications, Permissions} from 'expo'


export async function registerForPushNotificationsAsync() {
    const {status: existingStatus} = await
        Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const {status} = await
            Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await
        Notifications.getExpoPushTokenAsync();

    var updates = {}
    updates["/expoToken"] = token;
    database.ref("users").child(auth.currentUser.uid).update(updates);

    console.log(token);
}


export function register(data, successCB, errorCB) {
    return (dispatch) => {
        api.register(data, function (success, data, error) {
            if (success) successCB(data);
            else if (error) errorCB(error)
        });
    };
}

export function createUser(user, successCB, errorCB) {
    return (dispatch) => {
        dispatch({type: t2.RESET_POINTS});
        api.createUser(user, function (success, data, error) {
            if (success) {
                dispatch({type: t.LOGGED_IN, data: user});
                successCB();
            }else if (error) errorCB(error)
        },
        (newKey, valtype) => {
            dispatch({type: valtype.type, key: newKey});
        });
    };
}

export function login(data, successCB, errorCB, verifyCB) {
    return (dispatch) => {
        dispatch({type: t2.RESET_POINTS});
        api.login(data, function (success, data, error, verified) {
            if (success) {
                if(verified){
                    if (data.exists) dispatch({type: t.LOGGED_IN, data: data.user});
                    successCB(data);
                }
                else{
                    verifyCB(data.user);
                }
            }else if (error) errorCB(error)
        },
        (newKey, valtype) => {
            dispatch({type: valtype.type, key: newKey});
        });
    };
}

export function resetPassword(data, successCB, errorCB) {
    return (dispatch) => {
        api.resetPassword(data, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

export function signOut(successCB, errorCB) {
    return (dispatch) => {
        api.signOut(function (success, data, error) {
            if (success) {
                dispatch({type: t.LOGGED_OUT});
                successCB();
            }else if (error) errorCB(error)
        });
    };
}

export function checkVerify(user, successCB, errorCB){
    return (dispatch) => {
        api.checkVerify(user, function(user, success){
            if(success){
                successCB(user);
            }
            else{
                errorCB(user);
            }
        });
    };
}

export function checkLoginStatus(callback) {
    return (dispatch) => {
        auth.onAuthStateChanged((user) => {
            let isLoggedIn = (user !== null);

            if (isLoggedIn) {
                //get the user object from the Async storage
                AsyncStorage.getItem('user', (err, user) => {
                    if (user === null) isLoggedIn = false //set the loggedIn value to false
                    else {
                        dispatch({type: t.LOGGED_IN, data: JSON.parse(user)})
                        console.log("WOOPS");
                    }

                    callback(isLoggedIn);
                });
            } else {
                dispatch({type: t.LOGGED_OUT});
                callback(isLoggedIn);
            }
        });
    };
}

export function testquery(){
    return (dispatch) => {
        api.testquery();
    }
}