import Immutable from 'immutable';
import _times from 'lodash/times';
import _random from 'lodash/random';
import _forEach from 'lodash/forEach';
import _compact from 'lodash/compact';
import _without from 'lodash/without';
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

    case 'LEFT':
      return move(state, { x: 1 });

    default:
      return state || refreshState();
  }
};

function randomNumber (max = 2) {
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

function randomCells (state, n = 7) {
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

function indexInCells (cells, coordinates) {
  let { x, y } = coordinates;
  return cells.findIndex(function (cell) {
    return cell.get('x') === x && cell.get('y') === y;
  });
}

function availableCell (cells, coordinates) {
  let cell;
  let { value } = coordinates;
  let index = indexInCells(cells, coordinates);
  if (~index) {
    cell = cells.get(index);
  }
  return {
    ...coordinates,
    index,
    has: cell ? value === cell.get('value') : true,
  };
}

function opposite (axis) {
  var base = ['x', 'y'];
  return _without(base, axis)[0];
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
    .map((cell) => {
      let oCell = cell.toObject();
      let {
        [axis]: one,
        [sixa]: eno,
        value
      } = oCell;

      // left:
      let available;
      for (let i = one - 1; i >= 0; i -= direction[axis]) {
        let coordinates = {
          [axis]: i,
          [sixa]: eno,
          value
        };
        let find = availableCell(temp, coordinates);
        if (!find.has) break;
        available = find;
      }

      if (available) {
        let { x, y, index, value } = available;

        cell = cell.set('to', { x, y });
        temp = temp.delete(index);
        temp = temp.update(
          indexInCells(temp, oCell),
          (cell) => Immutable.Map({ x, y, value: ~index ? value * 2 : value }));
      }

      return cell;
    });
  return state;
}
