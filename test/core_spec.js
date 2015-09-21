import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

    describe('setEntries', () => {

      it('adds the entries to the state', () => {
        const state = Map();
        const entries = List.of('Trainspotting', 'Avengers');
        const nextState = setEntries(state, entries);
        expect(nextState).to.equal(Map({
          entries: List.of('Trainspotting', 'Avengers'),
        }));
      });

      it('converts to immutable', () => {
        const state = Map();
        const entries = ['Trainspotting', 'Avengers'];
        const nextState = setEntries(state, entries);
        expect(nextState).to.equal(Map({
          entries: List.of('Trainspotting', 'Avengers'),
        }));
      });

    });

    describe('next', () => {

      it('takes the next two entries under vote', () => {
        const state = Map({
          entries: List.of('Trainspotting', 'Avengers', 'Inception'),
        });
        const nextState = next(state);
        expect(nextState).to.equal(Map({
          vote: Map({
            pair: List.of('Trainspotting', 'Avengers'),
          }),
          entries: List.of('Inception'),
        }));
      });

      it('puts winner of current vote back to entries', () => {
        const state = Map({
          vote: Map({
            pair: List.of('Laputa', 'Princess Mononoke'),
            tally: Map({
              'Laputa': 4,
              'Princess Mononoke': 3,
            }),
          }),
          entries: List.of('Trainspotting', 'Avengers', 'Inception'),
        });
        const nextState = next(state);
        expect(nextState).to.equal(Map({
          vote: Map({
            pair: List.of('Trainspotting', 'Avengers'),
          }),
          entries: List.of('Inception', 'Laputa'),
        }));
      });

      it('puts both of tied vote back to entries', () => {
        const state = Map({
          vote: Map({
            pair: List.of('Laputa', 'Princess Mononoke'),
            tally: Map({
              'Laputa': 4,
              'Princess Mononoke': 4,
            }),
          }),
          entries: List.of('Trainspotting', 'Avengers', 'Inception'),
        });
        const nextState = next(state);
        expect(nextState).to.equal(Map({
          vote: Map({
            pair: List.of('Trainspotting', 'Avengers'),
          }),
          entries: List.of('Inception', 'Laputa', 'Princess Mononoke'),
        }));
      });

      it('marks winner when just one entry left', () => {
        const state = Map({
          vote: Map({
            pair: List.of('Trainspotting', 'Laputa'),
            tally: Map({
              'Trainspotting': 4,
              'Laputa': 5,
            }),
          }),
          entries: List(),
        });
        const nextState = next(state);
        expect(nextState).to.equal(Map({
          winner: 'Laputa',
        }));
      });

    });

    describe('vote', () => {

      it('creates a tally for the voted entry', () => {
        const state = Map({
          pair: List.of('Trainspotting', 'Avengers')
        });
        const nextState = vote(state, 'Trainspotting');
        
        expect(nextState).to.equal(Map({
          pair: List.of('Trainspotting', 'Avengers'),
          tally: Map({
            'Trainspotting': 1,
          }),
        }));
      });

      it('adds to existing tally for the voted entry', () => {
        const state = Map({
          pair: List.of('Trainspotting', 'Avengers'),
          tally: Map({
            'Trainspotting': 4,
            'Avengers': 2,
          }),
        });
        const nextState = vote(state, 'Trainspotting');

        expect(nextState).to.equal(Map({
          pair: List.of('Trainspotting', 'Avengers'),
          tally: Map({
            'Trainspotting': 5,
            'Avengers': 2,
          }),
        }));
      });

    });

});
