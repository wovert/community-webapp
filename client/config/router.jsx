import React from 'react'
import {
  // Switch,
  Route,
  Redirect,
  // Link,
  // BrowserRouter as Router,
} from 'react-router-dom'

// eslint-disable-next-line import/no-unresolved
import TopicList from '../views/TopicList'
// eslint-disable-next-line import/no-unresolved
import TopicDetail from '../views/TopicDetail'

// export default () => (
//   <Router>
//     <div>
//       <Link to="/">首页</Link>
//       <br />
//       <Link to="/detail">详情页</Link>
//       <br />
//     </div>
//     <Switch>
//       <Route path="/" render={() => <Redirect to="/list" />} exact />
//       <Route path="/list" component={TopicList} />
//       <Route path="/detail" component={TopicDetail} />
//     </Switch>
//   </Router>
// )

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="root" />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail" component={TopicDetail} key="detail" />,
]
