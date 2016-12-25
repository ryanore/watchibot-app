import React, {Component} from 'react'

class DashboardModule extends Component {
  constructor(props) {
    super(props)
    console.log('.......');
    console.log('module', this.props.params.moduleName)
  }
  render() {
    return (<div>module {this.props.params.moduleName}</div>)
  }
}

export default DashboardModule
