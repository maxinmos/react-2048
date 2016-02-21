import Immutable from 'immutable';
import _keys from 'lodash/keys';
import _some from 'lodash/some';
import _range from 'lodash/range';
import _without from 'lodash/without';
import { generateKey } from '../helpers/index.js';

export default (state, action) => {
  switch (action.type) {
    case 'NEW_GAME':
      return {
        cells: randomCells(state)
      };

    case 'MOVE':
      return move(state, action.payload);

    case 'MERGE':
      return state.hasMove ? {
        cells: randomCells({...state, cells: merge(state)})
      } : {};

    default:
      return {};
  }
};

function randomNumber (max = 1) {
  let random = Math.floor(Math.random() * max);
  return 8 * Math.pow(2, random);
}

function emptyIndexs ({ width, height, size, cells }, n) {
  let existingCells = cells.toJS().map(({ x, y }) => y * width + x);
  let results = [];
  n = Math.min(n, size - existingCells.length);
  while (n > 0) {
    let random = Math.floor(Math.random() * size);
    if (!~[].concat(results, existingCells).indexOf(random)) {
      results.push(random);
      n--;
    }
  }

  return results;
}

function randomCells (state, n = 2) {
  let {
    width,
    size,
    cells = Immutable.List()
  } = state;

  let newCells = emptyIndexs(state, n)
    .map((index) => {
      let y = Math.floor(index / width);
      let x = index % width;
      return Immutable.Map({
        y,
        x,
        index,
        key: generateKey(),
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

function axisOf (direction) {
  return _keys(direction)[0];
}

function opposite (axis) {
  var base = ['x', 'y'];
  return _without(base, axis)[0];
}

function rangeLoop (position, max, direction) {
  let axis = axisOf(direction);
  return direction[axis] > 0
    ? _range(position + 1, max)
    : _range(position - 1, -1);
}

export function move ({ width, height, cells }, direction) {
  let axis = axisOf(direction);
  let sixa = opposite(axis);
  let max = axis === 'x' ? width : height;
  let temp = cells;
  let hasMove = false;

  cells = cells
    .sortBy((cell) => cell.get(axis) * -direction[axis])
    .map((cell) => {
      let oCell = cell.toObject();
      let {
        [axis]: one,
        [sixa]: eno,
        value
      } = oCell;

      let available;
      _some(rangeLoop(one, max, direction), function (i) {
        let coordinates = {
          [axis]: i,
          [sixa]: eno,
          value
        };
        let find = availableCell(temp, coordinates);
        if (!find.has) return true;
        available = find;
      });

      if (available) {
        let { x, y, index, value } = available;
        hasMove = true;
        cell = cell.set('to', { x, y });
        temp = temp.delete(indexInCells(temp, oCell));
        if (~index) {
          temp = temp.update(
            indexInCells(temp, available),
            (cell) => Immutable.Map({ x, y, value: value * 2 }));
        }
        else {
          temp = temp.push(Immutable.Map({ x, y, value }))
        }

      }

      return cell;
    });

    return {
      cells,
      hasMove
    };
}

export function merge ({ cells }) {
  return cells
    .map(cell => {
      let to = cell.get('to');
      if (to) {
        cell = cell
          .delete('to')
          .merge(to);
      }
      return cell;
    })
    .reduce((reduction, cell) => {
      let oCell = cell.toObject();
      let {
        x,
        y,
        value
      } = cell.toObject();

      let index = indexInCells(reduction, oCell);
      if (~index) {
        return reduction.update(index,
            (cell) => cell
              .set('key', generateKey())
              .set('value', cell.get('value') + value));
      }

      return reduction.push(Immutable.Map({
        x,
        y,
        value,
        key: generateKey()
      }));

    }, Immutable.List());
}
