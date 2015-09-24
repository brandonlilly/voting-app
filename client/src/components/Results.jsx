import React, {Component} from 'react';
import {connect} from 'react-redux';
import Winner from './Winner';
import {next} from '../actions';

class Results extends Component {
  getVotes(entry) {
    const { tally } = this.props;
    return tally && tally.get(entry) || 0;
  }

  render() {
    const { pair = [], next, winner } = this.props;

    if (winner) {
      return <Winner winner={winner} ref="winner" />;
    }

    return (
      <div className="results">
        <div className="tally">
          {pair.map(entry =>
            <div key={entry} className="entry">
              <h1>{entry}</h1>
              <div className="voteCount">
                {this.getVotes(entry)}
              </div>
            </div>
          )}
        </div>
        <div className="management">
          <button
            className="next"
            onClick={next}
            ref="next"
          >
            Next!
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner'),
  };
}

export { Results };
const ResultsContainer = connect(mapStateToProps, { next })(Results);
export default ResultsContainer;
