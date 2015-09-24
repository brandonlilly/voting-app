import React, {Component} from 'react';
import {connect} from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';
import * as actions from '../actions';

class Voting extends Component {
  render() {
    const { winner } = this.props;

    return (
      <div>
        { winner ?
          <Winner winner={winner} ref="winner" /> :
          <Vote {...this.props} />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    winner: state.get('winner'),
    hasVoted: state.get('hasVoted'),
  };
}

const VotingContainer = connect(mapStateToProps, actions)(Voting);

export { Voting };
export default VotingContainer;
