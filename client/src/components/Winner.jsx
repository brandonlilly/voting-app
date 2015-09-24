import React, { Component } from 'react';

class Winner extends Component {
  render() {
    const { winner } = this.props;

    if (!winner) return null;

    return (
      <div className="winner">
        <h2>Winner is {winner}!</h2>
      </div>
    );
  }
}

export default Winner;
