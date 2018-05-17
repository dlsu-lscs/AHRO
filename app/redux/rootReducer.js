import { combineReducers } from 'redux';

import { reducer as authReducer } from "../modules/auth"
import { reducer as homeReducer } from "../modules/home"
import { reducer as eventReducer } from "../modules/calendar"

// Combine all the reducers
const rootReducer = combineReducers({ authReducer, homeReducer, eventReducer });

export default rootReducer;