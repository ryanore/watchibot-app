import React, { Component } from 'react'
import { Link } from 'react-router'

export default (props) => {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        { props.loggedIn
          ? <a onClick={props.logOut}>Log Out</a>
          : <Link to="/login">Log In</Link>
        }
      </ul>
      <hr />
    </div>
  )
}
