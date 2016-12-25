import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import ClientDropdown from '../components/client-dropdown'

class EmployeeHeader extends Component {
  componentWillMount() {
    this.props.fetchClientList()
  }

  /**
   * User selected item from dropdown, Update the url
   */
  handleClientSelected(key) {
    const {params, router} = this.props

    if( params.key !== key ){
      router.push({
        pathname: `/dashboard/${key}`
      })
    }
  }

  render(){
    const {currentClient, clientList, onSelectClient } = this.props.dashboard;
    if(!currentClient || !clientList) {
      return <div>loading</div>
    }

    return(
      <div>
        <select
          value={currentClient}
          onChange={ (e) => (this.handleClientSelected(e.target.value))}>
          {clientList.map(client => (
            <option
              key={client.customer_key}
              value={client.customer_key}>
              {client.customer_display_name}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

export default EmployeeHeader
