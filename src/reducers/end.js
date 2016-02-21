import Immutable from 'immutable';
import _keys from 'lodash/keys';
import _every from 'lodash/every';
import { move } from './cells.js';
import { WIN_SCORE } from '../constants.js';

export default (state, action) => {
  if (!_keys(state).length) return false;

  switch (action.type) {
    case 'CHECK_END':
      return check(state);

    default:
      return state.end || false;
  }
}

function check(state) {
  return checkWin(state) || checkLose(state);
}

function checkWin ({ cells }) {
  let result = false;

  cells.forEach(function (cell) {
    if (cell.get('value') >= WIN_SCORE) {
      result = 'win';
    }
  });

  return result;
}

function checkLose (state) {
  let {
    cells,
    size
  } = state;

  if (cells.size < size) return false;

  let lose = _every([{ x: 1 }, { y: 1 }], (direction) => {
    let { hasMove } = move(state, direction);
    if (!hasMove) return true;
  });

  if (lose) {
    return 'lose';
  }

  return false
}
