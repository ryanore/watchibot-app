import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import createStore from './store'
import RootApp from './containers/app'
import {verifyUserToken} from './actions/a.auth'

const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

const renderApp = (App) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}


if(module.hot) {
  // suppress react-router errors
  require('./utils/react-router-error-suppress').default()

  // enable hot-reloader on app
  module.hot.accept("./containers/app", () => {
    const NextApp = require("./containers/app").default
    renderApp(NextApp)
  });

  // enable hot-reloading on store
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  })
}

renderApp(RootApp);
