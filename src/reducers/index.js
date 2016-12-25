import { combineReducers } from 'redux'
import authReducer from './r.auth'
import userReducer from './r.user'
import dashboardReducer from './r.dashboard'

export default combineReducers({
	auth: authReducer,
  user: userReducer,
  dashboard: dashboardReducer
});
