import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import crossvent from 'crossvent';
import { transitionEnd, getTouches, getDirection } from '../helpers/index.js';
import Message from './Message.js';
import Grid from './Grid.js';
import TransitionCell from './TransitionCell.js';
import actionCreators from '../actions/actionCreators.js'
import style from './Board.css';

let Board = React.createClass({
  componentDidMount() {
    let {
      board,
      container
    } = this.refs;

    crossvent.add(board, 'touchstart', this._touchStart, true);
    crossvent.add(board, 'touchend', this._touchEnd, true);
    crossvent.add(container, transitionEnd(), (() => {
      let timeout = null;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => this._transitionEnd());
      };
    })(), true);
  },

  render () {
    let {
      board,
      others
    } = this.props;
    return (
      <div ref="board">
        <div className={style.outer}>
          <Message win={others.get('win')} lose={others.get('lose')}/>
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
      board,
      others,
      move,
    } = this.props;
    if (others.get('win')) return;
    if (!board.get('transition')) {
      move(getDirection(this.start, getTouches(e)));
      setTimeout(() => this._transitionEnd(), 300); // TO REVIEW
    }
  },

  _transitionEnd () {
    let {
      board,
      merge,
      checkWin,
      checkLose
    } = this.props;
    if (board.get('transition')) {
      merge();
      checkWin();
      checkLose();
    }
  }
});

export default connect(
  (state) => state,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
  )(Board);
