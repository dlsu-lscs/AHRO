import { auth, database, provider } from "../../config/firebase";

//Register the user using email and password
export function register(data, callback) {
    const { email, password } = data;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then(function(user){ 
            user.sendEmailVerification().then(function() {
                callback(true, user, null);
            }, function(error) {
                callback(false, null, error);
            });
        })
        .catch((error) => callback(false, null, error));

}

//Create the user object in realtime database
//Currently does not check if username already exists
export function createUser (user, callback) {
    database.ref('users').child(user.uid).update({ ...user })
        .then(() => callback(true, null, null))
        .catch((error) => callback(false, null, {message: error}));
}

//Sign the user in with their email and password
export function login(data, callback) {
    const { email, password } = data;
    auth.signInWithEmailAndPassword(email, password)
        .then(function(user){
            if(user.emailVerified){
                getUser(user, callback);
            }
            else{
                callback(true,user, null, false);
            }
        })
        .catch((error) => callback(false, null, error, false));
}

//Get the user object from the realtime database
export function getUser(user, callback) {
    database.ref('users').child(user.uid).once('value')
        .then(function(snapshot) {

            const exists = (snapshot.val() !== null);

            //if the user exist in the DB, replace the user variable with the returned snapshot
            if (exists) user = snapshot.val();

            const data = { exists, user }
            callback(true, data, null, true);
        })
        .catch(error => callback(false, null, error, false));
}

//Send Password Reset Email
export function resetPassword(data, callback) {
    const { email } = data;
    auth.sendPasswordResetEmail(email)
        .then((user) => callback(true, null, null))
        .catch((error) => callback(false, null, error));
}

export function signOut (callback) {
    auth.signOut()
        .then(() => {
            if (callback) callback(true, null, null)
        })
        .catch((error) => {
            if (callback) callback(false, null, error)
        });
}

export function checkVerify(user, callback){
    callback(user, user.emailVerified);
}