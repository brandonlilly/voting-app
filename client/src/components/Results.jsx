import React, {Component} from 'react';

class Results extends Component {
  getVotes(entry) {
    const { tally } = this.props;
    return tally ? tally.get(entry) : 0;
  }

  render() {
    const { pair = [] } = this.props;
    return (
      <div className="results">
        {pair.map(entry =>
          <div key={entry} className="entry">
            <h1>{entry}</h1>
            <div className="voteCount">
              {this.getVotes(entry)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Results;
