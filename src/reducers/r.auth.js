import {
  ACCESS_TOKEN_VERIFIED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESSFUL,
  LOGIN_USER_FAILURE
} from '../actions/a.auth.js'


const INITIAL_STATE = {
  access_token: null,
  loggedIn: false,
  isAuthenticating: false,
  statusText: null,
  tokenVerified: false
}


export default function AuthReducer(state = INITIAL_STATE, action) {

  switch(action.type) {

    case LOGIN_USER_REQUEST:
      return Object.assign({}, state,{
          loggedIn: false,
          isAuthenticating: true,
          tokenVerified: true
        }
      )

    case LOGIN_USER_SUCCESS:
      return Object.assign({}, action.payload, {
          loggedIn: true,
          isAuthenticating: false,
          tokenVerified: true
        }
      )

    case LOGIN_USER_FAILURE:
      return Object.assign({}, state,{
          loggedIn: false,
          isAuthenticating: false,
          tokenVerified: true
        }
      )

    case LOGOUT_USER_SUCCESSFUL:
      return Object.assign({}, INITIAL_STATE, {tokenVerified: true})


  }
  return state;
}
