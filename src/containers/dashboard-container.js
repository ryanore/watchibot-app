import React, {Component} from 'react'
import { connect } from 'react-redux'
import {intersects} from '../utils/array'
import CustomerDashboard from './dashboard-customer'
import BrokerDashboard from './dashboard-broker'
import EmployeeHeader from './employee-header'
import {fetchClientList, setClientKey} from '../actions/a.dashboard'


class DashboardContainer extends Component {

  componentWillMount() {
    this.checkAuth(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.checkAuth(newProps)
  }

  /**
   * Make sure they're logged in or send them to /login
   * If they are on /dashboard redirect them to the correct path.
   * Nobody should be only on /dashboard
   */
  checkAuth(props) {
    const{auth, user, router, location} = props

    if(!auth.loggedIn) {
      return router.push({
        pathname: '/login',
        query: { r: location.pathname }
      })
    }

    if( user.key && location.pathname === '/dashboard' ){
      router.push({
        pathname: `/dashboard/${user.key}`
      })
    }
  }


  render(){
    const role = this.props.user.role;

    if(!role){
      return <div>Loading userdata</div>
    }

    return(
      <div>
        {role === 'employee' &&
          <EmployeeHeader {...this.props} />
        }
        {(role === 'customer' || role === 'employee') &&
          <CustomerDashboard {...this.props} />
        }
        {role === 'broker' &&
          <BrokerDashboard {...this.props} />
        }
      </div>
    )
  }
}



const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  dashboard: state.dashboard
})

export default connect(mapStateToProps,{
  fetchClientList,
  setClientKey
})(DashboardContainer);
