import React, {Component} from 'react';
import {connect} from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';

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
  };
}

const VotingContainer = connect(mapStateToProps)(Voting);

export { Voting };
export default VotingContainer;
