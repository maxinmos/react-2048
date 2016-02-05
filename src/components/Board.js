import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from './Grid.js';
import TransitionCell from './TransitionCell.js';
import actionCreators from '../actions/actionCreators.js'
import style from './Board.css';

let Board = React.createClass({
  componentDidMount() {
    let { move } = this.props;
    this.refs.board.addEventListener('touchstart', function () {
      console.log('touch');
      move('LEFT');
    });
  },

  render () {
    let { board } = this.props;
    return (
      <div className={style.board} ref="board">
        <div className={style.layer}>
          {board.get('cells').map((cell, i) => (
            <TransitionCell key={i} {...cell.toJS()}/>
            ))}
        </div>
        <Grid
          width={board.get('width')}
          height={board.get('height')}/>
      </div>
      )
  }
});

export default connect(
  (state) => state,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
  )(Board);
