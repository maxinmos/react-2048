import React from 'react';
import style from './Cell.css';
import classnames from 'classnames';

export default ({ value }) => {
  var step = value
    ? Math.log(value/8) / Math.log(2) + 1
    : 0;
  return (
      <div className={style.cell}>
        <div className={`${style.outer} color-${step}`}>
          <span className={style.inner}>{value}</span>
        </div>
      </div>
    )
}
