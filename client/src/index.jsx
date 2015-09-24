import React from 'react';
import {Router, IndexRoute, Route} from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
import configureStore from './store';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import {setState} from './actions';

import App from './components/App';
import Voting from './components/Voting';
import Results from './components/Results';

const history = createHistory();
const socket = io(`${location.protocol}//${location.hostname}:8090`);
const store = configureStore(socket);

socket.on('state', state => {
  store.dispatch(setState(state));
});


React.render(
  <Provider store={store}>
    {() =>
      <Router history={history} >
        <Route path='/' component={App} >
          <IndexRoute component={Voting} />
          <Route path="results" component={Results} />
        </Route>
      </Router>
    }
  </Provider>,
  document.getElementById('app')
);
