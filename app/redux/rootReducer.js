import { combineReducers } from 'redux';

import { reducer as authReducer } from "../modules/auth"
import { reducer as homeReducer } from "../modules/home"
import { reducer as notificationsReducer } from "../modules/notifications"
import { reducer as mapReducer } from "../modules/map"
import { reducer as calendarReducer } from "../modules/calendar"

// Combine all the reducers
const rootReducer = combineReducers({ authReducer, homeReducer, notificationsReducer, mapReducer, calendarReducer });

export default rootReducer;