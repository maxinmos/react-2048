import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actionCreators from '../actions/actionCreators.js';
import Board from './Board.js';

let Game = React.createClass({
  componentDidMount: function () {
    let {
      newGame
    } = this.props;
    newGame();
  },
  render: function () {
    let {
      board,
      newGame
    } = this.props;
    console.log(board.toJS());
    return (
      <div>
        <button onClick={() => newGame()}>New game</button>
        <button>Save</button>
        <Board board={board}/>
      </div>
      )
  }
});

export default connect(
  (state) => state,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
  )(Game)
