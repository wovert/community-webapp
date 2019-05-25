/* eslint-disable import/extensions */
import React, { Component } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root'
// eslint-disable-next-line import/extensions
import {
  BrowserRouter,
} from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from './App'
import appState from '../store/app-state'

class ClientApp extends Component {
  componentDidMount() {
    // do something
  }

  render() {
    return (
      <Provider appState={appState}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default hot(ClientApp)
