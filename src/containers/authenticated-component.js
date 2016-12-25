import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'

export default function(ComposedComponent) {

  class AuthenticatedComponent extends Component {
    componentWillMount() {
      this.checkAuth(this.props)
    }

    componentWillReceiveProps(newProps) {
      this.checkAuth(newProps)
    }

    checkAuth(props) {
      if(!props.auth.loggedIn) {
        props.router.push({
          pathname: '/login',
          query: {
            r: props.location.pathname
          }
        })
      }
    }

    render() {
      return(<ComposedComponent {...this.props}/>)
    }
  }

  return connect( state => ({
    auth: state.auth
  }))(AuthenticatedComponent)

}
