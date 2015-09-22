import React, { Component } from 'react';

class Voting extends Component {
  hasVotedFor(entry) {
    return entry === this.props.hasVoted;
  }

  render() {
    const { pair = [], vote, hasVoted } = this.props;
    const disabled = !!hasVoted;

    return (
      <div className="voting">
        {pair.map(entry =>
          <button
            key={entry}
            onClick={() => vote(entry)}
            disabled={disabled}
          >
            <h1>{entry}</h1>
            {this.hasVotedFor(entry) && <div className="label">Voted</div>}
          </button>
        )}
      </div>
    );
  }
}

export default Voting;
