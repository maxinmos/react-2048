import React from 'react';
import style from './cell.css';

export default ({x, y, value}) => (
  <div className={style.cell}>
    <div className={style.outer}>
      <span className={style.inner}>{value}</span>
    </div>
  </div>
  )
