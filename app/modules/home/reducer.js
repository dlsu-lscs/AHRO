import * as t from './actionTypes';
import { NET_INFO_CHANGED } from 'react-native-redux-listener';

let initialState = { isConnected: false, data: [], rewards:{}, quizes: [], offset: 0, currQuiz: null};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case NET_INFO_CHANGED:
            state = Object.assign({}, state, {isConnected: action.isConnected});
            return state;

        case t.FIRST_ACTION:
            state = Object.assign({}, state, {data: action.data });
            return state;

        case t.GET_REWARDS:
            let staterewards = initialState.rewards;
            staterewards[action.key] = action.data;
            return {...state, rewards: staterewards};

        case t.GET_QUIZES:
            let statequizes = initialState.quizes;
            action.data.key = action.key;
            
            statequizes.push({...action.data});

            let statecurQuiz = initialState.currQuiz;
            if(statecurQuiz == null){
                statecurQuiz = {...action.data};
            }
            else if(statecurQuiz.timeend < action.data.timeend){
                statecurQuiz = {...action.data};
            }
            //console.log(statequizes);
            return {...state, quizes: statequizes, currQuiz: statecurQuiz};

        case t.CHANGE_TIME_OFFSET:
            return {...state, offset: action.data};
        default:
            return state;
    }
};


export default authReducer;