/* eslint-disable import/extensions */
import React, { Component } from 'react'
// eslint-disable-next-line import/extensions
import {
  Switch,
  NavLink,
} from 'react-router-dom'
import Routes from '../config/router'

class App extends Component {
  componentDidMount() {
    // do something
  }

  render() {
    return (
      <div>
        <div>
          <NavLink to="/">首页</NavLink>
          <br />
          <NavLink to="/detail">详情页</NavLink>
          <br />
          <NavLink to="/test">测试</NavLink>
          <br />
        </div>
        <Switch>
          <Routes />
        </Switch>
      </div>
    )
  }
}

export default App
