import configureStore from './src/store';
import startServer from './src/server';

const store = configureStore();

startServer(store);

store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json'),
});

store.dispatch({ type: 'NEXT' });
