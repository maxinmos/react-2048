import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actionCreators from '../actions/actionCreators.js';
import Board from './Board.js';
import style from './Game.css';

let Game = React.createClass({
  componentWillMount: function () {
    this.props.newGame();
  },

  render: function () {
    return (
      <div className={style.game}>
        <div className={style.actions}>
          <button onClick={() => this.props.newGame()}>New game</button>
        </div>
        <Board/>
      </div>
      )
  }
});

export default connect(
  (state) => ({}),
  (dispatch) => bindActionCreators(actionCreators, dispatch)
  )(Game)
