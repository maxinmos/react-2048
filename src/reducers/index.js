import Immutable from 'immutable';
import cells from './cells.js';
import end from './end.js';
import {
  GRID_WIDTH,
  GRID_HEIGHT
} from '../constants.js';

function freshState (width = GRID_WIDTH, height = GRID_HEIGHT) {
  return {
    width,
    height,
    size: width * height,
    end: false,
    cells: Immutable.List()
  };
}

export default (state = {}, action) => {
  switch (action.type) {
    case 'NEW_GAME':
      let { width , height } = action.payload || {};
      let _state = freshState(width, height);

      return {
        ..._state,
        cells: cells(_state, action),
      };

    case 'MOVE':
      return {
        ...state,
        cells: cells(state, action),
        isTransition: true
      };

    case 'MERGE':
      return {
        ...state,
        cells: cells(state, action),
        isTransition: false
      };

    default:
      return {
        ...state,
        end: end(state, action)
      };
  }
}

