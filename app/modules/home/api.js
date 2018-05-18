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