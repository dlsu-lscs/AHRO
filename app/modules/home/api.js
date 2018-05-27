import { auth, database, provider, startTime} from "../../config/firebase";

import * as helpers from './helpers';

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
	})
	
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

export function getTime(callback){
	loadJSON();
}

export function getLeaderBoard(callback){
	Promise.all([helpers.getAllPoints(),helpers.getAllTeamDetailsPromise(),helpers.getAllUserDetailsPromise()]).then(function(results){
		callback(results[0],results[1], results[2]);
	},function(error){
		console.error(error);
	})
}
export function updatePoints(reward, callback){ //needs callback

	var getDataPromise = helpers.getUserDetailsPromise().then(function(user){
		return database.ref("points").orderByChild(reward.key+"/solved").equalTo(true).once('value').then(function(snapshot){
			return ({pointsval: snapshot.val(), user: user});
			
		});
	}, function(error){
		callback("error", reward.key);
		console.log(error);
	})

	var updateDBpromise = getDataPromise.then(function(data){
		
		var solved = false;
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
				user: data.user.uid,
				point: reward.points
			}
			point[rewardkey] = {solved: true};
			if(data.user.team != null){
				point.team = data.user.team;
			}
			return database.ref('points/'+newPointKey).update( { ...point } );
		}
		else{
			//User/team already solved 
			return Promise.reject("done");
		}
	}, function(error){
		//something went wrong with getting the points
		callback("error", reward.key);
		console.log(error);
	})

	updateDBpromise.then(function(data) {
		//only if table was updated
		callback("win", reward.key);
	}, function (error){
		//failed to update
		if(error == "done"){
			callback("done", reward.key);
		}
		else{
			callback("error");
			console.log(error, reward.key);
		}
	})
}
