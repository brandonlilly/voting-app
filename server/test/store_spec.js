import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import configureStore from '../src/store';

describe('store', () => {

  it('is a redux store configured with the correct reducer', () => {
    const store = configureStore();
    expect(store.getState()).to.equal(Map());

    const action = {
      type: 'SET_ENTRIES',
      entries: ['Laputa', 'Inception'],
    };
    store.dispatch(action);

    expect(store.getState()).to.equal(fromJS({
      entries: ['Laputa', 'Inception'],
    }));
  });

});
