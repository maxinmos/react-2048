import {combineReducers} from 'redux';
import board from './board.js';
import others from './others.js';

export default (state = {}, action) => ({
  board: board(state.board, action),
  others: others(state, action)
});
