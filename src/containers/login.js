import React, {Component} from 'react'
import { connect } from 'react-redux'
import {browserHistory} from 'react-router'
import {logInUser} from '../actions/a.auth.js'

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'customer1',
      password: '123456'
    }
  }

  componentWillMount() {
    this.checkAuth(this.props)
  }
  componentWillReceiveProps(newProps) {
    this.checkAuth(newProps)
  }

  /**
   * If the user is loggedIn, send them home
   */
  checkAuth(props) {
    props.auth.loggedIn && props.router.push('/')
  }

  /**
   * Dispatch login action,
   * send the intended url for redirection once logged in
   */
  handleSubmit(e) {
    e.preventDefault();
    const redirect = this.props.router.location.query.r;
    this.props.logInUser(this.state.username, this.state.password, redirect)
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit.bind(this)} >
          <input
            name="username"
            onChange={(e) => this.setState({username: e.target.value})}
            value={this.state.username}
          />
          <input
            type="password"
            name="password"
            onChange={(e) => this.setState({email: e.target.value})}
            value={this.state.password}
          />
          <button onClick={this.onSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {logInUser}
)(LogIn)
