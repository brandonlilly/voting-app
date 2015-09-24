import React, {Component, cloneElement} from 'react';
import {Link} from 'react-router';
import {Map} from 'immutable';

const pair = ['Laputa', 'Inception'];
const tally = Map({'Laputa': 5});

class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
        <div>
          <Link to="/">Vote</Link> - <Link to="/results">Results</Link>
        </div>
      </div>
    )
  }
}

export default App;
