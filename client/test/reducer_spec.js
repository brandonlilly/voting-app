import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  describe('SET_STATE', () => {

    it('applies the state', () => {
      const initialState = Map();
      const state = Map({
        vote: Map({
          pair: List.of('Laputa', 'Inception'),
          tally: Map({ 'Laputa': 5 }),
        }),
      });
      const action = { type: 'SET_STATE', state };
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Laputa', 'Inception'],
          tally: { 'Laputa': 5},
        }
      }));
    });

    it('handles plain JS payload', () => {
      const initialState = Map();
      const state = {
        vote: {
          pair: ['Laputa', 'Inception'],
          tally: { 'Laputa': 5 },
        }
      };
      const action = { type: 'SET_STATE', state };
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Laputa', 'Inception'],
          tally: { 'Laputa': 5 },
        }
      }));
    });


    it('removes hasVoted if pair changes', () => {
      const initialState = fromJS({
        vote: {
          pair: ['Laputa', 'Inception'],
          tally: { 'Laputa': 7 },
        },
        hasVoted: 'Laputa',
      });
      const action = {
        type: 'SET_STATE',
        state: {
          vote: {
            pair: ['Princess Mononoke', 'Interstellar'],
          }
        }
      };
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Princess Mononoke', 'Interstellar'],
        }
      }));
    });

    it('doesn\'t remove hasVoted if pair stays the same', () => {
      const initialState = fromJS({
        vote: {
          pair: ['Laputa', 'Inception'],
          tally: { 'Laputa': 7 },
        },
        hasVoted: 'Laputa',
      });
      const action = {
        type: 'SET_STATE',
        state: {
          vote: {
            pair: ['Laputa', 'Inception'],
          }
        }
      };
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Laputa', 'Inception'],
        },
        hasVoted: 'Laputa',
      }));
    });

  });

  it('has an initial state', () => {
    const state = Map({
      vote: Map({
        pair: List.of('Laputa', 'Inception'),
        tally: Map({ 'Laputa': 5 }),
      }),
    });
    const action = { type: 'SET_STATE', state };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Laputa', 'Inception'],
        tally: { 'Laputa': 5},
      }
    }));
  });

  describe('VOTE', () => {

    it('sets hasVoted', () => {
      const state = fromJS({
        vote: {
          pair: ['Laputa', 'Inception'],
          tally: { 'Laputa': 4 }
        },
      });
      const action = { type: 'VOTE', entry: 'Laputa' };
      const nextState = reducer(state, action);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Laputa', 'Inception'],
          tally: { 'Laputa': 4 },
        },
        hasVoted: 'Laputa',
      }));
    });

    it('does not set hasVoted if entry is invalid', () => {
      const state = fromJS({
        vote: {
          pair: ['Laputa', 'Inception'],
          tally: { 'Laputa': 4 }
        },
      });
      const action = { type: 'VOTE', entry: 'Dark Knight Rises' };
      const nextState = reducer(state, action);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Laputa', 'Inception'],
          tally: { 'Laputa': 4 },
        }
      }));
    });

  });

});
