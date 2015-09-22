import React from 'react';
import {Router, IndexRoute, Route} from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';

import App from './components/App';
import Voting from './components/Voting';
import Results from './components/Results';

const history = createHistory();

const routes = (
  <Router history={history} >
    <Route path='/' component={App} >
      <IndexRoute component={Voting} />
      <Route path="results" component={Results} />
    </Route>
  </Router>
);

React.render(
  routes,
  document.getElementById('app')
);
