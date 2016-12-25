import React, { Component } from 'react'
import DateRange from './date-range'

export default (props) => {
  return (
    <div>
      <select
        value={props.currentClient}
        onChange={ (e) => (props.onSelectClient(e.target.value))}>
        {props.clientList.map(client => (
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
