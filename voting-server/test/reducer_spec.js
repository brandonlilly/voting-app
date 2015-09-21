import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Laputa', 'Inception']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Laputa', 'Inception'],
    }))
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Laputa', 'Inception'],
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Laputa', 'Inception'],
      },
      entries: [],
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Laputa', 'Inception'],
      },
      entries: [],
    });
    const action = {type: 'VOTE', entry: 'Laputa'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Laputa', 'Inception'],
        tally: { 'Laputa': 1 },
      },
      entries: [],
    }));
  });

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Laputa']};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Laputa'],
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Laputa', 'Inception']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Laputa'},
      {type: 'VOTE', entry: 'Inception'},
      {type: 'VOTE', entry: 'Laputa'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Laputa',
    }));
  });

});
