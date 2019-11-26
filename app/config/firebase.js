import * as firebase from 'firebase';

import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID } from "./constants"
// or simply import * as c from "./constants" then use c.FIREBASE_API_KEY

// Initialize Firebase
var config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

 const Firebase = require('firebase');

// This code creates an instance of the Firebase SDK and configures it with your config. Now you can import it anywhere in your codebase and it’s always this singleton.
//     When you see firebase from now on, assume that it’s imported from here.

export const database = firebase.database();
export const startTime = Firebase.database.ServerValue.TIMESTAMP;
export const auth = firebase.auth();