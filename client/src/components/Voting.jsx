import React, { Component, PropTypes } from 'react';
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

export default Voting;
