import React from 'react'
import { StaticRouter } from 'react-router-dom'

/* eslint-disable import/extensions */
import ServerApp from './views/ServerApp'

export default (context, url) => (
  <StaticRouter context={context} location={url}>
    <ServerApp />
  </StaticRouter>
)
