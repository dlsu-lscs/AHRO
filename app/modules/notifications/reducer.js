import * as t from './actionTypes';
import {TWEETS_AVAILABLE} from "./actionTypes";
import {LOADING_TWEETS} from "./actionTypes";

let initialState = {
    isLoading: false,
    tweets: []
};

const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        // case NET_INFO_CHANGED:
        //     state = Object.assign({}, state, {isConnected: action.isConnected,});
        //     return state;
        //
        // case t.FIRST_ACTION:
        //     state = Object.assign({}, state, {data: action.data });
        //     return state;
        case LOADING_TWEETS: {
            const tweets = state.tweets;

            //show loading signal
            if (tweets.length === 0) return {...state, isLoading: true}

            return state;
        }

        case TWEETS_AVAILABLE: {
            let {data} = action;
            let tweets = [];

            console.log(TWEETS_AVAILABLE)
            //convert the snapshot (json object) to array
            data.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                tweets.push(item);
            });

            tweets.reverse();

            return {...state, tweets: tweets, isLoading: false};
        }

        default:
            return state;

    }
};


export default notificationsReducer;