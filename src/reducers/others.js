import React from 'react';
import Immutable from 'immutable';
import { WIN_SCORE } from '../constants.js';

export default (state, action) => {
  switch (action.type) {
    case 'CHECK_WIN':
      return checkWin(state);

    case 'NEW_GAME':
      return state.others.set('win', false);

    default:
      return state.others || Immutable.Map();
  }
}

function checkWin (state) {
  let {
    board,
    others
  } = state;
  let result = false;

  board.get('cells').forEach(function (cell) {
    if (cell.get('value') >= WIN_SCORE) {
      result = true;
    }
  });

  return others.set('win', result);
}
