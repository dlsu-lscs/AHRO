import { auth, database, provider, startTime} from "../../config/firebase";
import axios from 'axios';
import * as helpers from './helpers';
import * as constants from './constants';


import * as t from './actionTypes';

export function getRewards(callback, errorCB){
	database.ref('rewards').on('child_added', function(snapshot){
		try{
			rewards = snapshot.val();
			const key = snapshot.key;
			callback(key,rewards);
		}
		catch (error){
			console.log(error);
		}
	});
	
}

export function getQuizes(callback, errorCB){
	database.ref('quizes').on('child_added', (snapshot) => {
		try{
			quizes = snapshot.val();
			const key = snapshot.key;
			callback(key,quizes);
		}
		catch(error){
			errorCB();
		}
    })
    
}

export function getCodes(callback, errorCB){
	database.ref('codes').on('child_added', (snapshot)=>{
		try{
			codes = snapshot.val();
			const key = snapshot.key;
			callback(key,codes);
		}
		catch(error){
			console.log(error);
			//errorCB();
		}
	})
}

export function getPoints(callback){
	var getDataPromise = helpers.getUserDetailsPromise().then(function(user){
		listenToUser(user, callback);
	}, function(error){
		callback(t.ERROR_TYPE, reward.key);
		console.log(error);
	})
}

export function listenToUser(user, callback){
	if(user.team != null){
		database.ref('teams').child(user.team).child('rewards').on('child_added', function(snapshot){
			try{
				reward = snapshot.val();
				const key = snapshot.key;
				//console.log(reward);
				callback(key, reward);
			}
			catch(error){
				console.log(error);
			}
		})
	}
	else{
		database.ref('users').child(user.uid).child('rewards').on('child_added', function(snapshot){
			try{
				reward = snapshot.val();
				const key = snapshot.key;
				callback(key, reward);
			}
			catch(error){
				console.log(error);
			}
		})
	}
}
export function getLeaderBoard(callback){
	Promise.all([helpers.getAllTeamDetailsPromise(),helpers.getAllUserDetailsPromise(), helpers.getUserDetailsPromise()]).then(function(results){
		callback(results[0], results[1], results[2]);
	},function(error){
		console.error(error);
	})
}
export function updatePoints(reward, callback){ //needs callback
	var getDataPromise = helpers.getUserDetailsPromise().then(function(user){
		if(user.team == null){
			return Promise.resolve({data: user.rewards, user:user});
		}
		else{
			return database.ref('teams/'+user.team).once('value').then(function(snapshot){
				return {data: snapshot.val().rewards, user: user};
			});
		}
	}, function(error){
		callback(t.ERROR_TYPE, reward.key);
		console.log(error);
	})

	var updateDBpromise = getDataPromise.then(function(data){
		rewards = data.data;
		user = data.user;
		
		if(rewards != null && rewards[reward.key] != null){
			return Promise.reject(t.DONE_TYPE);
		}
		else{
			const rewardkey = reward.key;
			var point = {
				user: data.user.uid,
				point: reward.points,
				type: reward.rewardType,
				task: rewardkey,
			}
			var updates = {};
			if(user.team != null){
				updates['/teams/'+user.team+'/rewards/'+rewardkey] = point;
			}
			else{
				updates['/users/'+user.uid+'/rewards/'+rewardkey] = point;
			}

			return database.ref().update( updates );
		}

	}, function(error){
		callback(t.ERROR_TYPE, reward.key);
		console.log(error);
	});
	updateDBpromise.then(function(data) {
		//only if table was updated
		if(reward.fail != null) callback(t.LOSE_TYPE, reward.key);
		else callback(t.WIN_TYPE, reward.key, reward.points);
	}, function (error){
		//failed to update
		if(error == t.DONE_TYPE){
			callback(t.DONE_TYPE, reward.key);
		}
		else{
			callback(t.ERROR_TYPE);
			console.log(error, reward.key);
		}
	})
}

// Create team then add current authenticated user to the team
export function createTeam (data, callback, listenCB) {

	// TODO: Check for unique team name
	var user;
	var newTeamKey;
    helpers.getUserDetailsPromise().then(function(_user) {
		user = _user;
		//checks if team exists
		return database.ref("teams").orderByChild("teamName").equalTo(data.team).once("value").then(function(snaphshot){
			return snaphshot.val();
		});
	}).then(function (teamexist) {
        if (user && teamexist == null && user.team == null) {
            // Get a key for the new team.
			newTeamKey = database.ref().child('teams').push().key;
			console.log(newTeamKey);
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
			//merge user points to team
			if(user.rewards != null){
				teamData.rewards = {}
				Object.keys(user.rewards).map(function(key){
					teamData.rewards[key] = {...user.rewards[key]}
				})
			}
            // Update user data with new team
            user['team'] = newTeamKey;

            var updates = {};
            updates['/teams/' + newTeamKey] = teamData;
            updates['/users/' + user.uid] = user;

            return database.ref().update(updates);
		} 
		else if(teamexist != null){
			console.log("team name already exists");
			callback(false, null, {message: 'Team name already taken.'});
		}
		else if(user.team != null){
			console.log("you already have a team")
			callback(false, null, {message: 'You already have a team.'});
		}
		else {
			//console.error("User cannot be found.");
            callback(false, null, {message: 'User cannot be found.'});
        }
    }).then(function() {
		console.log(newTeamKey);
		database.ref('teams').child(newTeamKey).child('rewards').on('child_added', function(snapshot){
			try{
				reward = snapshot.val();
				const key = snapshot.key;
				listenCB(key, reward);
			}
			catch(error){
				console.log(error);
			}
		})
        console.log("Success.");
        callback(true, null, null);
    }, function(error) {
		console.log(error);
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

// Add user to team
// Send invitation to user
export function sendInvite (data, callback) {

    var teamId;
    var sentToId;

    helpers.getUserDetailsPromise().then(function(authUser) {
        console.log(authUser['team']);
        console.log(data);
        console.log(authUser.team);

        teamId = authUser.team;

        return database.ref('users').orderByChild('username').equalTo(data.username).once("value").then(function(snapshot) {
            // add user id of specified username to the invites list of the team
            // return the user
            return snapshot.val();
        });
    }).then(function(user) {
        if(user != null ){
            console.log('received user object');
            console.log(user);

            sentToId = Object.keys(user)[0];

            return database.ref().child("/teams/" + teamId).once("value").then(function(snapshot) { 
                return snapshot.val();
            });
		}
		else{
			callback(false, null, {message: "User does not exist"});
		}
    }).then(function(team) {
        console.log('received team object');
        console.log(team);

        var updates = {};
        updates['/users/' + sentToId + '/invites/' + teamId ] = team.teamName;

        console.log(updates);

        return database.ref().update(updates);
    }).then(function() {
        console.log("sendInvite success");
        callback(true, null, null);
    }, function(error) {
        //console.error("Error in sendInvite.");
        console.log(error);
        callback(false, null, {message: error});
    });
}

// Get invites of user
export function getInvites (callback) {
    helpers.getUserDetailsPromise().then(function(user) {
        if (user) {
            return database.ref('/users/' + user.uid).child("/invites/").once("value").then(function(snapshot) { 
                return snapshot.val();
            });
        } else {
            console.error("User cannot be found.");
            callback(false, null, {message: constants.ERROR_NO_AUTHENTICATED_USER});
        }
    }).then(function(invites) {
        console.log("Success.");
        console.log(invites);
        callback(true, invites, null);
    }, function(error) {
        console.log("@api.getInvites ERROR");
        console.log(error);
        callback(false, null, {message: error});
    });
}

export function acceptInvite (data, callback, listenCB) {
    console.log("@api acceptInvite");
    console.log(data);

	var authUser;
    helpers.getUserDetailsPromise().then(function(user) {
        if (user) {

            authUser = user;
            
            var updates = {};
            user['team'] = data.id;
            updates['/users/' + user.uid] = user;

            return database.ref().update(updates);
        } else {
            console.error("User cannot be found.");
            callback(false, null, {message: constants.ERROR_NO_AUTHENTICATED_USER});
        }
    }).then(function() {
        //Promise to get team's rewards
        return database.ref("teams").child(data.id).once("value").then(function(snapshot){
            return snapshot.val();
        });
    }).then(function(team){
        if(authUser.rewards != null && team.rewards != null){
            Object.keys(authUser.rewards).map(function(key){
                if(team.rewards[key] != null && team.rewards[key].point < authUser.rewards[key].point){
                    team.rewards[key] = {...authUser.rewards[key]}
				}
				else if(team.rewards[key] == null){
					team.rewards[key] = {...authUser.rewards[key]}
				}
            })
        }
        else if(authUser.rewards != null && team.rewards == null){
            team.rewards = {...authUser.rewards};
        }
        var updates = {};

        teamUser = {
            fname: authUser.fname,
            lname: authUser.lname,
            member: true,
        };
        if(team.rewards != null && authUser.rewards != null){
            updates['/teams/'+ data.id + '/rewards/'] = team.rewards;
        }

        updates['/users/' + authUser.uid + '/invites/' + data.id] = null;
        updates['/teams/' + data.id + '/users/' + authUser.uid] = teamUser;

        return database.ref().update(updates);
    }).then(function() {
		database.ref('teams').child(data.id).child('rewards').on('child_added', function(snapshot){
			try{
				reward = snapshot.val();
				const key = snapshot.key;
				console.log(reward);
				listenCB(key, reward);
			}
			catch(error){
				console.log(error);
			}
		})
        console.log("Success.");
        callback(true, null, null);
    }, function(error) {
        console.log(error);
        callback(false, null, {message: error});
    });
}




            
