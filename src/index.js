import React from 'react'
import ReactDOM from 'react-dom'
import RootApp from './containers/app'
import createStore from './store'

const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    <RootApp />
  </Provider>,
  document.getElementById('root')
)
