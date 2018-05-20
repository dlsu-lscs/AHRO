import { auth, database, provider } from "../../config/firebase";

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

export function updatePoints(user, reward, hasrewardCB){
	//hmmm so should i assume everything asyncs here? nope haha idk gg
	database.ref('teams').orderByChild("users/"+user.uid+"/member").equalTo(true).limitToFirst(1).once('value').then(
        (snapshot) => {
        	const teamsnap = snapshot.val(); //returns list of 1 team where the user is in
            
            if(teamsnap !== null){
	            const teamkey = Object.keys(teamsnap)[0]; //gets the key of the first team
				const teamval = teamsnap[teamkey]; //Gets the first object of teams using the first key
	            	
            	//User has team
            	if(teamval.rewards == null){
            		//team has no reward yet yuck
            		teamval.rewards = {};
            		teamval.rewards[reward.key] = rewards.points;
            		database.ref('teams').child(teamkey).update({ ...teamval });
            	}
            	else if(teamval.rewards[reward.key] == null){
            		teamval.rewards[reward.key] = reward.points;
            		console.log(teamval);
            		database.ref('teams').child(teamkey).update({ ...teamval });
            	}
            	else{
            		hasrewardCB();
            	}
            }
            else{
            	//User has no teamm
            	//Creates a soloteam in teams table
            	let newteam = {
            		team: false,
            		rewards: {},
            		users: {}
            	}
            	newteam.users[user.uid] = {
            		fname: user.fname,
            		lname: user.lname,
            		member: true
            	}
            	newteam.rewards[reward.key] = reward.points;
            	const pushref = database.ref('teams').push();
            	const newKey = pushref.key;
            	pushref.set(newteam);

            }
        }
    )
	.catch((error) => {
		console.log(error);
	});
	
	/*
	database.ref('users').child(user.uid).once('value').then(
		snapshot => {
			const val = snapshot.val();
			if(val !== null){
				//user exists
				if(val.team == null){
					//has no team
					if(val.rewards == null){
						// has no reward yet
						val.rewards = {};
						val.rewards[reward.key] = reward.points; 
						database.ref('users').child(user.uid).update({ ...val });
					}
					else if(val.rewards[reward.key] == null){
						//has rewards but not this specific reward
						val.rewards[reward.key] = reward.points; 
						database.ref('users').child(user.uid).update({ ...val });
					}
					else{
						//has reward
						hasrewardCB();
					}
				}
				else{
					//has team, finds team
					database.ref('teams').child(val.team).once('value').then(
						teamsnap => {
							const teamval = teamsnap.val();
							if(teamval !== null){
								if(teamval.rewards == null){
									//team has no rewards yet
									teamval.rewards = {};
									teamval.rewards[reward.key] = reward.points; 
									database.ref('teams').child(val.team).update({ ...teamval });
									
								}
								else if(teamval.rewards[reward.key] == null){
									//team does not have specific rewards
									teamval.rewards[reward.key] = reward.points; 
									database.ref('teams').child(val.team).update({ ...teamval });
								}
								else{
									hasrewardCB();
								}
							}

							else{
								//user db says he has team but team not found in teams table
							}

						}
					)
					//User has a team

				}
			}
			else{
				//somehow magically the user doesnt exist in db
			}
		}
	)
	*/
}