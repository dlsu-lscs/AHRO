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
	database.ref('quizes').on('value', (snapshot) => {
		try{
			let quizes = [];
			quizes = snapshot.val();
			callback(quizes);
		}
		catch(error){
			errorCB();
		}
    })
}

export function updatePoints(user, reward, hasrewardCB){
	//hmmm so should i assume everything asyncs here? nope haha idk gg
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
									//team does not have specific reward
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
}