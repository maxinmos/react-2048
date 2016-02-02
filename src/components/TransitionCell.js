import React from 'react';
import Cell from './Cell.js';
import style from './TransitionCell.css';

export default ({ x, y, value }) => {
  let inlineStyle = {
    left: x * 50,
    top: y * 50
  };
  console.log(inlineStyle);
  return (
    <div className={style.cell} style={inlineStyle}>
      <Cell value={value}/>
    </div>
    )
}
