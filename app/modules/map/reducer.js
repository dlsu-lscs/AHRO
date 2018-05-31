import {EVENTS_AVAILABLE} from "./actionTypes";
import {LOADING_EVENTS} from "./actionTypes";

let initialState = {
    isLoading: false,
    events: []
};

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        // case NET_INFO_CHANGED:
        //     state = Object.assign({}, state, {isConnected: action.isConnected,});
        //     return state;
        //
        // case t.FIRST_ACTION:
        //     state = Object.assign({}, state, {data: action.data });
        //     return state;
        case LOADING_EVENTS: {
            const events = state.events;

            //show loading signal
            if (events.length === 0) return {...state, isLoading: true}

            return state;
        }

        case EVENTS_AVAILABLE: {
            let {data} = action;
            let events = [];

            //convert the snapshot (json object) to array
            data.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                events.push(item);
            });

            events.reverse();

            return {...state, events: events, isLoading: false};
        }

        default:
            return state;

    }
};


export default mapReducer;