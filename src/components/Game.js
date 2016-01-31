import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actionCreators from '../actions/actionCreators.js';
import Grid from './Grid.js';
import style from './style.css';

let Game = React.createClass({
  componentDidMount: function () {
    let {
      newGame
    } = this.props;
    newGame();
  },
  render: function () {
    let {
      grid,
      newGame
    } = this.props;
    return (
      <div>
        <button onClick={() => newGame()}>New game</button>
        <button>Save</button>
        <Grid grid={grid}/>
      </div>
      )
  }
});

export default connect(
  (state) => state,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
  )(Game)
