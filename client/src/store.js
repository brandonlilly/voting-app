import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer';
import createLogger from 'redux-logger';
import remoteAction from './remote_action_middleware';

const logger = createLogger({
  predicate: () => false,
  logger: console,
});


export default function configureStore(socket) {
  const finalCreateStore = compose(
    applyMiddleware(remoteAction(socket)),
    applyMiddleware(logger)
  )(createStore);
  
  const store = finalCreateStore(reducer);
  return store;
}
