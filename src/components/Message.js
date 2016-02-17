import React from 'react';
import style from './Message.css';

export default ({ end }) => {
  let message = end && (end === 'win' ? 'You Win!' : 'Oh oh!');
  return (
    <div>
      {message &&
        <div className={style.message}>
          <span>{message}</span>
        </div>}
    </div>
  )
}
