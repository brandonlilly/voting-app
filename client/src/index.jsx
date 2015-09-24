import React from 'react';
import {Router, IndexRoute, Route} from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
import configureStore from './store';

import App from './components/App';
import Voting from './components/Voting';
import Results from './components/Results';

const history = createHistory();
const store = configureStore();

const action = {
  type: 'SET_STATE',
  state: {
    vote: {
      pair: ['Laputa', 'Inception'],
      tally: { 'Laputa': 7}
    },
  }
};
store.dispatch(action);

const router = (
  <Router history={history} >
    <Route path='/' component={App} >
      <IndexRoute component={Voting} />
      <Route path="results" component={Results} />
    </Route>
  </Router>
);

React.render(
  router,
  document.getElementById('app')
);
