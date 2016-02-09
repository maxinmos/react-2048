import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { transitionEnd, getTouches, getDirection } from '../helpers/index.js';
import Win from './Win.js';
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
    let {
      board,
      others
    } = this.props;
    return (
      <div ref="board">
        <div className={style.outer}>
          {others.get('win') && <Win/>}

          <div className={style.container} ref="container">
            {board.get('cells').map((cell, i) => (
              <TransitionCell
                key={`key-${cell.get('key')}`}
                {...cell.toJS()}/>
              ))}
          </div>

          <Grid
            width={board.get('width')}
            height={board.get('height')}/>
        </div>
      </div>
      )
  },

  _touchStart (e) {
    this.start = getTouches(e);
  },

  _touchEnd (e) {
    let {
      move,
      others
    } = this.props;
    if (others.get('win')) return;
    move(getDirection(this.start, getTouches(e)));
  },

  _transitionEnd () {
    let {
      board,
      merge,
      checkWin
    } = this.props;
    if (board.get('transition')) {
      merge();
      checkWin();
    }
  }
});

export default connect(
  (state) => state,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
  )(Board);
