import React from 'react';
import style from './Message.css';

export default ({ win, lose }) => (
  <div>
    {(win || lose) &&
      <div className={style.message}>
        <span>{win ? 'You Win!' : 'Oh oh!'}</span>
      </div>}
  </div>
  )
