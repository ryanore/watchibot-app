import axios from 'axios'
import config from '../config'
import clientList from '../tmp/clientList'
import {browserHistory} from 'react-router'
const {API_ROOT}  = config
export const CLIENT_LIST_RECEIVED = 'CLIENT_LIST_RECEIVED'
export const CLIENT_KEY_SET = 'CLIENT_KEY_SET'


export function clientListRecieved(data) {
  return {
    type: 'CLIENT_LIST_RECEIVED',
    payload: data
  }
}
export function fetchClientList() {
  return (dispatch) => {
    setTimeout(() =>{
      return dispatch( clientListRecieved(clientList))
    }, 400)
  }
}

export function setClientKey(key) {
  return{
    type: 'CLIENT_KEY_SET',
    payload: key
  }
}
