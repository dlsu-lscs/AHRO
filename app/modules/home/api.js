import axios from 'axios';
import { auth, database, provider } from "../../config/firebase";
import * as helpers from './helpers';
import * as constants from './constants';

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
                teamName: data.team,
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
export function getTeam (callback) {
    helpers.getUserDetailsPromise().then(function(user) {
        if (user) {
            return database.ref().child("/teams/" + user.team).once("value").then(function(snapshot) { 
                return snapshot.val();
            });
        } else {
            console.error("User cannot be found.");
            callback(false, null, {message: constants.ERROR_NO_AUTHENTICATED_USER});
        }
    }).then(function(team) {
        if(team) {
            console.log("Success.");
            callback(true, team, null);
        } else {
            callback(false, null, {message: constants.ERROR_USER_NO_TEAM});
        }
    }, function(error) {
        console.log("@api.getTeam ERROR");
        console.log(error);
        callback(false, null, {message: error});
    });
}

// Send invitation to user
export function sendInvite (data, callback) {

    var teamId;
    helpers.getUserDetailsPromise().then(function(authUser) {
        console.log(authUser['team']);
        console.log(authUser.team);

        teamId = authUser.team;

        return database.ref('users').orderByChild('username').equalTo(data.username).once("value").then(function(snapshot) {
            // add user id of specified username to the invites list of the team
            // return the user
            return snapshot.val();
        });
    }).then(function(user) {
        console.log('received user object');
        console.log(user);

        var updates = {};
        updates['/users/' + Object.keys(user)[0] + '/invites/' + teamId ] = true;

        console.log(updates);

        return database.ref().update(updates);

    }).then(function() {
        console.log("sendInvite success");
        callback(true, null, null);
    }, function(error) {
        console.error("Error in sendInvite.");
        console.log(error);
        callback(false, null, {message: error});
    });
}



