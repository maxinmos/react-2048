import React from 'react';
import _times from 'lodash/times';
import Cell from './Cell.js';

export default ({ width, height }) => (
  <div className="grid">
    {_times(height, (y) => (
      <div key={y}>
        {_times(width, (x) => <Cell key={x}/>)}
      </div>
      ))}
  </div>
  )