import React, { Component } from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
// eslint-disable-next-line import/no-unresolved
import { AppState } from '../../store/app-state'

@inject('appState') @observer class TopicList extends Component {
  constructor(props) {
    super(props)
    this.changeName = this.changeName.bind(this)
  }

  componentDidMount() {
    // do simething
  }

  changeName(event) {
    // eslint-disable-next-line react/destructuring-assignment
    // this.props.appState.name = event.target.value
    // eslint-disable-next-line react/destructuring-assignment
    this.props.appState.changeName(event.target.value)
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { msg } = this.props.appState
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        <br />
        {msg}
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
}

export default TopicList
