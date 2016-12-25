import {
  CLIENT_LIST_RECEIVED,
  CLIENT_KEY_SET
} from '../actions/a.dashboard.js'

const INITIAL_STATE = {
  clientList: [],
  currentClient: null
}


export default function DashboardReducer(state = INITIAL_STATE, action) {

  switch(action.type) {
    case CLIENT_KEY_SET:
      return Object.assign({}, state, {
        currentClient: action.payload
      })

    case CLIENT_LIST_RECEIVED:
      return Object.assign({}, state,{
        clientList: action.payload
      })
  }
  return state;
}
