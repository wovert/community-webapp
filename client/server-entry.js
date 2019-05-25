import React from 'react'
import { StaticRouter } from 'react-router-dom'
import {
  Provider,
  useStaticRendering,
} from 'mobx-react'

import ServerApp from './views/ServerApp'
import { createStoreMap } from './store/store'

// mobx 在服务端渲染的时候不会再重复数据变量
useStaticRendering(true)

export default (stores, routerContext, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <ServerApp />
    </StaticRouter>
  </Provider>
)

export { createStoreMap }
