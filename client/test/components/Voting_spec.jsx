import React, {findDOMNode} from 'react/addons';
import Voting from '../../src/components/Voting';
import {expect} from 'chai';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} = React.addons.TestUtils;

describe('Voting', () => {

  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={['Laputa', 'Inception']} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].getDOMNode().textContent).to.equal('Laputa');
    expect(buttons[1].getDOMNode().textContent).to.equal('Inception');
  });

  it('invokes a callback when a button is clicked', () => {
    let votedWith;
    const vote = entry => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={['Laputa', 'Inception']} vote={vote}/>
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0].getDOMNode());

    expect(votedWith).to.equal('Laputa');
  });

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Voting pair={['Laputa', 'Inception']} hasVoted="Laputa" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].getDOMNode().hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].getDOMNode().hasAttribute('disabled')).to.equal(true);
  });

  it('labels voted entries', () => {
    const component = renderIntoDocument(
      <Voting pair={['Laputa', 'Inception']} hasVoted="Laputa" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].getDOMNode().textContent).to.contain('Voted');
  });

  it('renders just the winner when there is one', () => {
    const component = renderIntoDocument(
      <Voting pair={['Laputa', 'Inception']} winner="Laputa" />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Laputa');
  });

  // it('renders as a pure component', () => {
  //   const pair = ['Laputa', 'Inception'];
  //   const component = renderIntoDocument(
  //     <Voting pair={pair} />
  //   );
  //
  //   let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
  //   expect(firstButton.getDOMNode().textContent).to.equal('Laputa');
  //
  //   pair[0] = 'Princess Mononoke';
  //   React.render(component);
  //   firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
  //   expect(firstButton.getDOMNode().textContent).to.equal('Laputa');
  // });

  // it('is disabled after voting', () => {
  //   let votedWith;
  //   const vote = entry => votedWith = entry;
  //
  //   const component = renderIntoDocument(
  //     <Voting pair={['Laputa', 'Inception']} vote={vote}/>
  //   );
  //
  //   const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
  //   Simulate.click(buttons[0].getDOMNode());
  //   expect(votedWith).to.equal('Laputa');
  //   Simulate.click(buttons[1].getDOMNode());
  //   expect(votedWith).to.equal('Laputa');
  // });

});
