import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer';
import createLogger from 'redux-logger';

const logger = createLogger({
  predicate: () => false,
  logger: console,
});

const finalCreateStore = compose(
  applyMiddleware(logger)
)(createStore);

export default function configureStore() {
  const store = finalCreateStore(reducer);
  return store;
}
