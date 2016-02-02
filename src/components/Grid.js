import React from 'react';
import _times from 'lodash/times';
import Cell from './Cell.js';
import style from './Grid.css';

export default ({ width, height }) => (
  <div className={style.grid}>
    {_times(height, (y) => (
      <div key={y}>
        {_times(width, (x) => <Cell key={x}/>)}
      </div>
      ))}
  </div>
  )
