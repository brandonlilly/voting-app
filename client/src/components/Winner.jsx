import React, { Component } from 'react';

class Winner extends Component {
  render() {
    const { winner } = this.props;

    if (!winner) return null;

    return (
      <div className="winner">
        Winner is {winner}!
      </div>
    );
  }
}

export default Winner;
