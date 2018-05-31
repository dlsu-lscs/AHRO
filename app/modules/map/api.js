import {auth, database} from "../../config/firebase";


export function getEvents(callback) {
    const eventsRef = database.ref('events');

    //start listening for new data
    eventsRef.on('value', function(snapshot) {
        callback(true, snapshot, null)
    });
}

export function getCurrentEvents(callback){
    const eventsRef = database.ref('events')

    eventsRef.on('value', function(snapshot){
        //filter here or call the querying function
        callback(true, snapshot, null)
    });
}



