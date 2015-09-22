import React from 'react';
import Voting from './components/Voting';

const pair = ['Laputa', 'Inception'];

React.render(
  <Voting pair={pair} hasVoted="Laputa" />,
  document.getElementById('app')
);
