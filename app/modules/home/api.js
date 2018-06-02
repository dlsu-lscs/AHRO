import { auth, database, provider, startTime} from "../../config/firebase";

import * as helpers from './helpers';

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
				console.log(reward);
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
