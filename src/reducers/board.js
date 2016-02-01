import Immutable from 'immutable';
import _times from 'lodash/times';
import _random from 'lodash/random';
import _forEach from 'lodash/forEach';
import _compact from 'lodash/compact';
import {
  GRID_WIDTH,
  GRID_HEIGHT
} from '../constants.js';

let initialState = Immutable.Map({
  cells: Immutable.List()
});

export default (state, action) => {
  switch (action.type) {
    case 'NEW_GAME':
      let {
        height = GRID_HEIGHT,
        width = GRID_WIDTH,
      } = action.payload;
      return state.merge({ width, height });

    default:
      return state || initialState;
  }
};

function randomNumber (max = 3) {
  let random = Math.floor(Math.random() * max);
  return 8 * Math.pow(2, random);
}

export function createGrid (height, width) {
  let grid = Immutable.List();
  _times(height, (y) => {
    let cols = Immutable.List();
    _times(width, (x) => {
      cols = cols.set(x, Immutable.Map({
        x: x,
        y: y,
      }));
    });
    grid = grid.set(y, cols);
  });

  return grid;
}

function emptyCells (grid) {
  return grid
    .flatten(1)
    .map(({ value }, index) => !value && index)
    .filter(value => value !== false);
}

function emptyIndexs (grid, n) {
  let indexs = emptyCells(grid);
  let results = [];

  while (n > 0) {
    let random = Math.floor(Math.random() * indexs.size);
    let value = indexs.get(random);
    if (!~results.indexOf(value)) {
      results.push(value);
      n--;
    }
  }

  return results;
}

export function randomCell (grid, n = 3) {
  let width = grid.get(0).size;
  let empty = emptyIndexs(grid, n);

  _forEach(empty, function (index) {
    let y = Math.floor(index / width);
    let x = index % width;
    let value = randomNumber();
    grid = grid.mergeIn([y, x], {value})
  });

  return grid;
}
