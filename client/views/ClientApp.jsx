/* eslint-disable import/extensions */
import React, { Component } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root'
// eslint-disable-next-line import/extensions
import {
  BrowserRouter,
} from 'react-router-dom'
import App from './App'

class ClientApp extends Component {
  componentDidMount() {
    // do something
  }

  render() {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  }
}

export default hot(ClientApp)
