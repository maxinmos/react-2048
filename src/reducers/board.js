import Immutable from 'immutable';
import _times from 'lodash/times';
import _random from 'lodash/random';
import _forEach from 'lodash/forEach';
import _compact from 'lodash/compact';
import _reject from 'lodash/reject';
import {
  GRID_WIDTH,
  GRID_HEIGHT
} from '../constants.js';

let initialState = Immutable.Map({
  width: GRID_WIDTH,
  height: GRID_HEIGHT,
  size: GRID_WIDTH * GRID_HEIGHT,
  cells: Immutable.List()
});

function refreshState (width = GRID_WIDTH, height = GRID_HEIGHT) {
  return Immutable.Map({
    width,
    height,
    size: width * height,
    cells: Immutable.List()
  });
}

export default (state, action) => {
  switch (action.type) {
    case 'NEW_GAME':
      let {
        height,
        width,
      } = action.payload;

      state = refreshState();
      return state.merge({
        cells: randomCells(state)
      });

    default:
      return state || refreshState();
  }
};

function randomNumber (max = 3) {
  let random = Math.floor(Math.random() * max);
  return 8 * Math.pow(2, random);
}

function emptyIndexs ({ size, cells = Immutable.List() }, n) {
  let existingCells = cells.toJS().map(({ index }) => index);
  let results = [];

  while (n > 0) {
    let random = Math.floor(Math.random() * size);
    if (!~[].concat(results, existingCells).indexOf(random)) {
      results.push(random);
      n--;
    }
  }

  return results;
}

function randomCells (state, n = 3) {
  let {
    width,
    size,
    cells
  } = state.toObject();

  let newCells = emptyIndexs({ size, cells }, n)
    .map((index) => {
      let y = Math.floor(index / width);
      let x = index % width;
      return Immutable.Map({
        y,
        x,
        index,
        value: randomNumber()
      });
    });

  return cells.concat(newCells);
}

function availableCell (cells, axis, value) {
  var cell = cells.find(function (cell) {
    return cell.get('x') === axis.x && cell.get('y') === axis.y;
  });

  return cell
    ? cell.get('value') === value
    : true;
}

function opposite (axis) {
  var base = ['x', 'y'];
  return _reject(base, axis)[0];
}

// Direction
// Left: { x: 1 }
// Right: { x: -1 }
// Up: { y: 1 }
// Down: { y: -1 }
function move (state, direction) {
  let { width, height, cells } = state.toObject();
  let axis = Object.keys(direction)[0];
  let sixa = opposite(axis);
  let temp = cells;
  cells = cells
    .sortBy((cell) => cell.get(axis) * direction[axis])
    .map((cell, index) => {
      let available;
      cell = cell.toObject();

      // left:
      for (let i = cell[axis] - 1; i >= 0; i -= direction[axis]) {
        let check = availableCell(temp, {
          [axis]: i,
          [sixa]: cell[sixa]
        }, value);
        if (!check) break;
        available = check;
      }

      // if (available) {
      //   let { x, y, value } = available.toObject();
      //   temp = temp.setIn(index, (cell) => {
      //     if (cell.value)
      //     cell
      //   })
      // }
    });
}
