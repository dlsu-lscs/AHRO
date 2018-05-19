import axios from 'axios';
import { auth, database, provider } from "../../config/firebase";
import * as helpers from './helpers';

// Create team then add current authenticated user to the team
export function createTeam (data, callback) {
    // TODO: Check for unique team name
    helpers.getUserDetailsPromise().then(function(user) {
        if (user) {
            // Get a key for the new team.
            var newTeamKey = database.ref().child('teams').push().key;
            
            // Team data
            var teamData = {
                team: true,
                teamName: 'Fabulous <3',
                users: {
                    [user.uid]: {
                        fname: user.fname,
                        lname: user.lname,
                        member: true,
                    },
                },
            };

            // Update user data with new team
            user['team'] = newTeamKey;

            var updates = {};
            updates['/teams/' + newTeamKey] = teamData;
            updates['/users/' + user.uid] = user;

            return database.ref().update(updates);
        } else {
            console.error("User cannot be found.");
            callback(false, null, {message: 'User cannot be found.'});
        }
    }).then(function() {
        console.log("Success.");
        callback(true, null, null);
    }, function(error) {
        console.error("Error in executing get user details promise.");
        callback(false, null, {message: error});
    });
}

// Get team and members
export function getTeam (data, callback) {
    helpers.getUserDetailsPromise().then(function(user) {
        if (user) {
            return database.ref().child("/teams/" + user.team).once("value").then(function(snapshot) { 
                return snapshot.val();
            });
        } else {
            console.error("User cannot be found.");
            callback(false, null, {message: 'User cannot be found.'});
        }
    }).then(function(team) {
        if(team) {
            console.log("Success.");
            callback(true, team, null);
        } else {
            callback(false, null, {message: "User currently has no team."});
        }
    }, function(error) {
        callback(false, null, {message: error});
    });
}

// Add user to team


