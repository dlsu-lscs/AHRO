import { auth, database, provider } from "../../config/firebase";

// Get the Promise of the user equivalent item from the authenticated user details
export function getUserDetailsPromise () {
    var userAuthDetails = auth.currentUser;

    return database.ref('users/' + userAuthDetails.uid).once("value").then(function(snapshot) {
        return snapshot.val();
    }, function(error) {
        console.error(error);
    });

}


