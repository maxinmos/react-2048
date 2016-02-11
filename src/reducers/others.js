import React from 'react';
import Immutable from 'immutable';
import _every from 'lodash/every';
import { move, merge } from './board.js';
import { WIN_SCORE } from '../constants.js';

export default (state, action) => {
  switch (action.type) {
    case 'NEW_GAME':
      return state.others
        .set('lose', false)
        .set('win', false);

    case 'CHECK_WIN':
      return checkWin(state);

    case 'CHECK_LOSE':
      return checkLose(state);

    default:
      return state.others || Immutable.Map();
  }
}

function checkWin ({ board, others }) {
  let result = false;
  board.get('cells').forEach(function (cell) {
    if (cell.get('value') >= WIN_SCORE) {
      result = true;
    }
  });

  return others.set('win', result);
}

function checkLose ({ board, others }) {
  let cells = board.get('cells');
  let size = board.get('size');
  if (cells.size < size) return others;

  let lose = _every([{ x: 1 }, { y: 1 }], (direction) => {
    let fake = merge(move(board, direction));
    if (fake.get('cells').size >= size) return true;
  });

  if (lose) {
    return others.set('lose', true);
  }
  return others
}
