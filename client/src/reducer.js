import {Map, List} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function resetVote(state, nextState) {
  const pair = state.getIn(['vote', 'pair']);
  const nextPair = nextState.getIn(['vote', 'pair']);
  if (pair && nextPair &&
      pair.first() === nextPair.first() &&
      pair.last() === nextPair.last()) {
    return nextState;
  }
  return nextState.remove('hasVoted');
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
      const nextState = setState(state, action.state);
      return resetVote(state, nextState);
    case 'VOTE':
      return vote(state, action.entry);
  }
  return state;
}
