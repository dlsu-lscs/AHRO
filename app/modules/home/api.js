import { auth, database, provider, startTime} from "../../config/firebase";

import * as helpers from './helpers';

export function getRewards(callback, errorCB){
		/*
		var x = new Date();
        var y = new Date("2018-05-20T05:30:01.958Z");
        console.log(x);
        console.log(y);

        console.log(x-y);
        console.log((x-y)/1000);
        */
    /*
    fetch('http://worldclockapi.com/api/json/est/now').then((response) => {
    	data = response.json();
		console.log(data.currentDateTime);
		syncTime();
    }, (error) =>{
		console.log(error);
    });
	*/
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

	/*
	var solved = false;
			Object.keys(val).map(function(key){
				if(val[key].user == user.uid || val[key].team == user.team){
					solved = true;
				}
			});
			if(!solved){
				var newPointKey = database.ref('points').push().key;
				const rewardkey = reward.key;
				var point = {
					rewardkey: {solved: true, points: reward.points},
					user: user.uid
				}
				if(user.team != null){
					point.team = user.team;
				}
				return database.ref('points').child(newPointKey).update({ ...point });
			}
	*/

}