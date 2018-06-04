import * as t from './actionTypes';
import { NET_INFO_CHANGED } from 'react-native-redux-listener';

let initialState = { isConnected: false, data: [], rewards:{}, quizes: {}, offset: 0, currQuiz: null, codes: {}, cameraOn: false};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case NET_INFO_CHANGED:
            state = Object.assign({}, state, {isConnected: action.isConnected});
            return state;

        case t.FIRST_ACTION:
            state = Object.assign({}, state, {data: action.data });
            return state;

        case t.GET_REWARDS:
            staterewards = initialState.rewards;
            staterewards[action.key] = action.data;
            return {...state, rewards: staterewards};

        case t.GET_QUIZES:
            statequizes = initialState.quizes;
            statequizes[action.key] = action.data;
            statequizes[action.key].key = action.key;
            statecurQuiz = initialState.currQuiz;

            if(statecurQuiz == null){
                statecurQuiz = {...action.data};
            }
            else if(statecurQuiz.timeend < action.data.timeend){
                statecurQuiz = {...action.data};
            }
            //console.log(statequizes);
            return {...state, quizes: statequizes, currQuiz: statecurQuiz};
            
        case t.GET_CODES:
            statecodes = initialState.codes;
            statecodes[action.data.code] = action.data;
            return {...state, codes: statecodes};

        case t.CHANGE_TIME_OFFSET:
            return {...state, offset: action.data};
        case t.RESET_POINTS:
            staterewards = initialState.rewards;
            statequizes = initialState.quizes;
            staterewards.answered = {};
            statequizes.answered = {};

            return {...state, rewards: staterewards, quizes: statequizes }
        case t.SUBMIT_REWARD:
            staterewards = initialState.rewards;
            if(staterewards.answered == null) {
                staterewards.answered = {};
            }
            staterewards.answered[action.key] = true;
            //console.log(staterewards);
            return {...state, rewards: staterewards};
        case t.CHANGE_CAMERA:
            return {...state, cameraOn: action.data};
        case t.SUBMIT_QUIZ:
            statequizes = initialState.quizes;
            if(statequizes.answered == null) {
                statequizes.answered = {};
            }
            statequizes.answered[action.key]= true;

            //console.log(statequizes)
            return {...state, quizes: statequizes};
        default:
            return state;
    }
};


export default authReducer;