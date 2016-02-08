import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { transitionEnd, getTouches, getDirection } from '../helpers/index.js';
import Grid from './Grid.js';
import TransitionCell from './TransitionCell.js';
import actionCreators from '../actions/actionCreators.js'
import style from './Board.css';

let Board = React.createClass({
  componentDidMount() {
    this.refs.board.addEventListener('touchstart', this._touchStart);
    this.refs.board.addEventListener('touchend', this._touchEnd);

    this.refs.container.addEventListener(transitionEnd(), (() => {
      let timeout = null;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => this._transitionEnd());
      };
    })());
  },

  render () {
    let { board } = this.props;
    return (
      <div className={style.board} ref="board">
        <div className={style.layer} ref="container">
          {board.get('cells').map((cell, i) => {
              let oCell = cell.toObject();
              let { x, y } = oCell;
              return (
                <TransitionCell key={`key-${x}-${y}`} {...oCell}/>
                );
            })}
        </div>
        <Grid
          width={board.get('width')}
          height={board.get('height')}/>
      </div>
      )
  },

  _touchStart (e) {
    this.start = getTouches(e);
  },

  _touchEnd (e) {
    this.props.move(getDirection(this.start, getTouches(e)));
  },

  _transitionEnd () {
    let {
      board,
      merge
    } = this.props;
    board.get('transition') && merge();
  }
});

export default connect(
  (state) => state,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
  )(Board);
