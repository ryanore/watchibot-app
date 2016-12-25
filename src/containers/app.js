import React, {Component} from 'react'
import {Provider, connect} from 'react-redux'
import {Router, Route, browserHistory, IndexRoute, Redirect} from 'react-router'
import {verifyUserToken} from '../actions/a.auth'
import {intersects} from '../utils/array'
import AuthenticatedComponent from './authenticated-component'
import AppContainer from './app-container'
import LogIn from './login'
import DashboardContainer from './dashboard-container'
import CustomerDashboard from './dashboard-customer'

import Page403 from '../components/page-403'
import Page404 from '../components/page-404'
import PageAbout from '../components/page-about'
import PageHome from '../components/page-home'

import DashboardFeedback from '../components/dashboard-feedback'
import DashboardOverview from '../components/dashboard-overview'
import DashboardModule from '../components/dashboard-module'


class App extends Component {
  componentWillMount() {
    this.props.verifyUserToken()
  }

  render() {
    if(!this.props.auth.tokenVerified) {
      return <h1>Checking Token</h1>
    }

    return(
      <Router history={browserHistory}>
        <Route path="/" component={AppContainer }>
          <IndexRoute component={PageHome} />
          <Route path="/login" component={LogIn} />
          <Route path="/about" component={PageAbout} />
          <Route path="/403" component={Page403} />
          <Route path="/dashboard(/:key)" component={DashboardContainer}>
            <IndexRoute component={DashboardOverview}/>
            <Route path="feedback" component={DashboardFeedback}/>
            <Route path=":moduleName" component={DashboardModule}/>
          </Route>
          <Route path="*" component={Page404} />
        </Route>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {
  verifyUserToken
})( App )
