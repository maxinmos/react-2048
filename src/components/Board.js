import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Hammer from 'hammerjs';
import Message from './Message.js';
import Grid from './Grid.js';
import TransitionCell from './TransitionCell.js';
import actionCreators from '../actions/actionCreators.js'
import style from './Board.css';

let Board = React.createClass({
  componentDidMount() {
    let { board } = this.refs;
    var hammer    = new Hammer.Manager(board);
    hammer.add(new Hammer.Swipe());
    hammer
      .on('swipeleft', this._move({ x: -1 }))
      .on('swiperight', this._move({ x: 1 }))
      .on('swipeup', this._move({ y: -1 }))
      .on('swipedown', this._move({ y: 1 }));
  },

  render () {
    let {
      width,
      height,
      cells,
      end
    } = this.props;
    return (
      <div ref="board">
        <div className={style.outer}>
          <Message end={end}/>
          <div className={style.container}>
            {cells.map((cell, i) => (
              <TransitionCell
                key={`key-${cell.get('key')}`}
                {...cell.toJS()}/>
              ))}
          </div>

          <Grid width={width} height={height}/>
        </div>
      </div>
      )
  },

  _move (direction) {
    return () => {
      let {
        isTransition,
        end,
        move,
      } = this.props;
      if (end) return;
      if (!isTransition) {
        move(direction);
        setTimeout(() => this._transitionEnd(), 300); // TO REVIEW
      }
    };
  },

  _transitionEnd () {
    let {
      isTransition,
      merge,
      checkEnd
    } = this.props;
    if (isTransition) {
      merge();
      checkEnd();
    }
  }
});

export default connect(
  (state) => state,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
  )(Board);
