import {auth, database} from "../../config/firebase";
import {getUser} from "../auth/api";


export function getTweets(callback) {
    const tweetsRef = database.ref('twitter_posts');

    //start listening for new data
    tweetsRef.on('value', function(snapshot) {
        callback(true, snapshot, null)
    });
}

