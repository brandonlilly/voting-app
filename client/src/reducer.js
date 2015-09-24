import {Map} from 'immutable';

export default function reducer(state = Map(), action) {
  switch(action.type) {
    case 'SET_STATE':
      return state.merge(action.state);
  }
  return state;
}
