import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actionCreators from '../actions/actionCreators.js';
import Board from './Board.js';
import style from './Game.css';

let Game = React.createClass({
  componentDidMount: function () {
    let {
      newGame,
      move
    } = this.props;
    newGame();
    setTimeout(function () {
      move('LEFT');
    });
  },
  render: function () {
    let {
      board,
      newGame
    } = this.props;
    return (
      <div className={style.game}>
        <div className={style.actions}>
          <button onClick={() => newGame()}>New game</button>
          <button>Save</button>
        </div>
        <Board board={board}/>
      </div>
      )
  }
});

export default connect(
  (state) => state,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
  )(Game)
