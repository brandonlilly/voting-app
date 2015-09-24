import React from 'react/addons';
import {List, Map} from 'immutable';
import {Results} from '../../src/components/Results';
import {expect} from 'chai';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} = React.addons.TestUtils;

describe('Results', () => {

  it('renders entries with vote counts or zero', () => {
    const pair = List.of('Laputa', 'Inception');
    const tally = Map({ 'Laputa': 5 });
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [laputa, inception] = entries.map(entry => entry.getDOMNode().textContent);

    expect(entries.length).to.equal(2);
    expect(laputa).to.contain('Laputa');
    expect(laputa).to.contain('5');
    expect(inception).to.contain('Inception');
    expect(inception).to.contain('0');
  });

  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => {nextInvoked = true};
    const pair = List.of('Laputa', 'Inception');
    const component = renderIntoDocument(
      <Results pair={pair} tally={Map()} next={next} />
    );
    Simulate.click(React.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const pair = List.of('Laputa', 'Inception');
    const component = renderIntoDocument(
      <Results winner="Laputa" pair={pair} />
    );
    const winner = React.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Laputa');
  });

});
