import axios from 'axios'
import jwtDecode from 'jwt-decode'
import config from '../config'
import {browserHistory} from 'react-router'
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGOUT_USER_SUCCESSFUL = 'LOGOUT_USER_SUCCESSFUL'

const {API_ROOT}  = config

/**
 * Log Out
 * @return {[type]} [description]
 */
export function logOutUser(e) {
  e && e.preventDefault()
  localStorage.removeItem('access_token')
  browserHistory.push('/')
  return {
    type: LOGOUT_USER_SUCCESSFUL
  }
}


/**
 * Making login network request
 * @return {Object}
 */
export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

/********************/
/*      THUNKS   */
/********************/


/**
 * User was successfully logged in - from logInUser()
 * Or
 * User already is logged in - from verifyUserToken()
 * @param  {Object} access_token JWT form server
 * @return {Object}
 */
export function loginUserSuccess(data, redirect='/') {
  const token = data.access_token
  const decoded = jwtDecode(token)

  localStorage.setItem('access_token', token)
  setTimeout(()=> {
    browserHistory.push(redirect)
  }, 10)

  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      access_token: token,
      user: decoded
    }
  }
}


/**
 * User Failed Login - state modified
 * If they have an access_token remove it
 * @param  {Object} error
 * @return {Object} error info
 */
export function loginUserFailure(error) {
  localStorage.removeItem('access_token')
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      error: error
    }
  }
}


/**
 * Make Auth Request to verify the access_token
 * from localStorage
*/
export function verifyUserToken() {
  const redirect = browserHistory.getCurrentLocation().pathname
  const access_token = localStorage.getItem('access_token')

  return (dispatch) => {
    if (!access_token) {
      return dispatch( loginUserFailure('no token'))
    }

    let config = {
      headers: {'Authorization': 'Bearer ' + access_token}
    }

    axios.get(`${API_ROOT}/session/`, config)
      .then( res => {
        if( res.data.access_token) {
          return dispatch( loginUserSuccess(res.data, redirect))
        }
      })
      .catch( res=> {
        return dispatch( loginUserFailure(res))
      })
  }
}


/**
 * Login form submitted
 * @param  {String} un username
 * @param  {String} pw password
 * @param  {String}  redirect = "/" Optionally redirect to specific url
 * @return {Promise}
 */
export function logInUser(un, pw, redirect) {
  const data = {username: un, password: pw}

  return (dispatch) => {
    dispatch(loginUserRequest())

    axios.post(`${API_ROOT}/session/`, data)
    .then( res => {
      dispatch(loginUserSuccess(res.data, redirect))
    })
    .catch( ex => {
      dispatch(loginUserFailure(ex))
    })
  }
}
