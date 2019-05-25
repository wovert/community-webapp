/* eslint-disable import/extensions */
import React, { Component } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root'
// eslint-disable-next-line import/no-extraneous-dependencies

import App from './App'

class ServerApp extends Component {
  componentDidMount() {
    // do something
  }

  render() {
    return (
      <App />
    )
  }
}

export default hot(ServerApp)
