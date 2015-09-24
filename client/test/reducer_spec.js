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
          tally: { 'Laputa': 5},
        }
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

});
