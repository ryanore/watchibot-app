import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

class BrokerDashboard extends Component {
  render(){
    return(
      <div>
        Broker Dashboard
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(BrokerDashboard)
