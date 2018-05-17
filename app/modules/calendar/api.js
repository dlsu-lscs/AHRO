import { auth, database, provider } from "../../config/firebase";

export function getEvents(callback) {
    const eventsRef = database.ref('events');

    //start listening for new data
    eventsRef.on('value', function(snapshot) {
        callback(true, snapshot, null)
    });
}