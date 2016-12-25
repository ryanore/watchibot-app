import {broker, partner, employee, customer} from '../tmp/user'
import {intersects} from '../utils/array'
import {
  ACCESS_TOKEN_VERIFIED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESSFUL,
  LOGIN_USER_FAILURE
} from '../actions/a.auth.js'


const TEMP_USER = employee

const INITIAL_STATE = {}

const getUser = (u) => {
  let a = u.attributes
  let user = {
    alexiqversion: a.alexiqversion[0],
    alexiqprivilege: a.alexiqprivilege[0],
    alexiqaccess: a.alexiqaccess[0],
    organizationname: a.organizationname[0],
    cn: a.cn[0]
  }
  switch(u.roles[0]) {
    case 'employee':
      return {
        ...user,
        role: 'employee',
        key: 'employee'
      }
    case 'customer':
      return {
        ...user,
        role: 'customer',
        key: a.customerkey[0]
    }
    case 'broker':
    case 'partner':
      return {
        ...user,
        role: 'broker',
        key: a.partnerkey[0]
      }
  }
  return user
}


export default function AuthReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOGIN_USER_SUCCESS:
      const user = TEMP_USER //action.payload.user
      return getUser(user)

    case LOGIN_USER_FAILURE:
      return INITIAL_STATE

    case LOGOUT_USER_SUCCESSFUL:
      return INITIAL_STATE
  }
  return state
}
