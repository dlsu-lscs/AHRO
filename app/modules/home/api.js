import { auth, database, provider, startTime} from "../../config/firebase";
import axios from 'axios';
import * as helpers from './helpers';

export function getRewards(callback, errorCB){
	database.ref('rewards').on('value', (snapshot) => {
		try{
			let rewards = [];
			rewards = snapshot.val();
			callback(rewards);
		}
		catch(error){
			errorCB();
		}
    })
}

export function getQuizes(callback, errorCB){
	database.ref('quizes').on('child_added', (snapshot) => {
		try{
			let quizes = [];
			quizes = snapshot.val();
			const key = snapshot.key;
			callback(key,quizes);
		}
		catch(error){
			errorCB();
		}
    })
}

export function getInvitations(callback, errorCB){
	database.ref('teams/invitations').on('child_added', (snapshot) => {
		try{
			let val = snapshot.val();
			const key = snapshot.key;
			callback(key,val);
			//console.log(key);
			//console.log(val);

		}
		catch(error){
			console.log(error);
			errorCB();
		}
    })
}

export function getTime(callback){
	loadJSON();
}

export function getLeaderBoard(){
	var solos = {}
	var AllTeams = {}
	helpers.getAllUserDetailsPromise().then((users) => {
		Objects.keys(users).map(function(key){
			if(users[key].team == null){
				//has no team
				solos[key] = users[key];
			}
		});
		return helpers.getAllTeamDetailsPromise();
	}, function(error){
		console.error(error);
	}).then(function(teams){
		AllTeams = teams;
		//callback;
	}, function(error){
		console.error(error);
	});
}
export function updatePoints(reward, hasrewardCB){ //needs callback

	helpers.getUserDetailsPromise().then(function(user){
		return database.ref("points").orderByChild(reward.key+"/solved").equalTo(true).once('value').then(function(snapshot){
			return ({pointsval: snapshot.val(), user: user});
			
		});
	}, function(error){
		//no user
		console.error(error);
	}).then(function(data){
		var solved = false;
		console.log(data.pointsval);
		if(data.pointsval != null){
			Object.keys(data.pointsval).map(function(key){
				if(data.pointsval[key].user == data.user.uid || data.pointsval[key].team == data.user.team){
					solved = true;
				}
			});
		}
		if(!solved){
			var newPointKey = database.ref('points').push().key;
			const rewardkey = reward.key;
			var point = {
				user: user.uid
			}
			point[rewardkey] = {solved: true, points: reward.points};
			if(user.team != null){
				point.team = user.team;
			}
			return database.ref('points/'+newPointKey).update( { ...point } );
		}
	}, function(error){
		//something went wrong with getting the points
		console.error(error);
	}).then(function() {
		//only if table was updated

	}, function (error){
		//failed to update
		console.error(error);
	})

}

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

