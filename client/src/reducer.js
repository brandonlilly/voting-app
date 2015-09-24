import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function vote(state, entry) {
  const pair = state.getIn(['vote', 'pair']);
  if (pair && !pair.includes(entry)) {
    return state;
  }
  return state.set('hasVoted', entry);
}

export default function reducer(state = Map(), action) {
  switch(action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'VOTE':
      return vote(state, action.entry);
  }
  return state;
}
